// import { Component, OnInit } from '@angular/core';


// export class StatusOnboardingComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }





import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import {ConfirmationService} from "primeng/api";

export interface roleTableInterface {
  status_id: string;
  status: string;
}


@Component({
  selector: 'app-status-onboarding',
  templateUrl: './status-onboarding.component.html',
  styleUrls: ['./status-onboarding.component.css']
})
export class StatusOnboardingComponent implements OnInit {

  token:string
  table_list:any
  dataSource:any=null;
  displayedColumns:any=null;
  search_table_data:roleTableInterface[]=[]
  @ViewChild('dt') table: Table;
  

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService
  ) { 

  }


  ngOnInit(): void {
    this.token=localStorage.getItem('session_token')
    this.getTableData()
  }

  applyFilterGlobal($event:any, stringVal:any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  confirm(event: Event,id:string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to delete?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteStatus(id)
      },
      reject: () => {
        console.log('rejected')
      }
    });
  }
  
  deleteStatus(id:string){
    console.log(id)
    const deleteURL="/api/status/delete/"+id
    const headers = {'Authorization' : this.token}
    console.log(deleteURL)
    this.http.delete(deleteURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      location.reload()
    });
  }

  getTableData(){
    const getURL ="/api/status/list"
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      var detail=JSON.parse(body['detail'])
      this.table_list=detail
      console.log(detail)
      for (var x in detail){
        console.log(detail[x])
        this.search_table_data.push(
          {
            status_id : detail[x]['status_id'],
            status : detail[x]['status'],
          }
        )
      }
      console.log(this.search_table_data)
      this.displayedColumns=['status_id','status'];
      this.dataSource=this.search_table_data
    });

  }
}
