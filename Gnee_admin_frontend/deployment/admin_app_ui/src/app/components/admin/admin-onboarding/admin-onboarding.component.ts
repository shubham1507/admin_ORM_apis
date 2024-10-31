import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Table } from 'primeng/table';
import {ConfirmationService} from "primeng/api";

export interface associateTableInterface {
  associateFullName: string;
  associateID: string;
  associateCountry: string;
  associateStatus: string;
  associatePhone: string;
}



@Component({
  selector: 'app-admin-onboarding',
  templateUrl: './admin-onboarding.component.html',
  styleUrls: ['./admin-onboarding.component.css']
})
export class AdminOnboardingComponent implements OnInit {

  @ViewChild('dt') table: Table;
  token:string
  table_list:any
  dataSource:any=null;
  displayedColumns:any=null;
  error_message:any;
  search_table_data:associateTableInterface[]=[]
  
  

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
        this.deleteAssociate(id)
      },
      reject: () => {
        console.log('rejected')
      }
    });
  }
  
  deleteAssociate(id:string){
    console.log(id)
    const deleteURL="/api/associates/delete/"+id
    const headers = {'Authorization' : this.token}
    console.log(deleteURL)
    this.http.delete(deleteURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      location.reload()
    });
  }

  getTableData(){
    const getURL ="/api/associates/list"
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
            associateFullName : detail[x]['first_name']+' '+detail[x]['last_name'],
            associateID : detail[x]['associate_id'],
            associateCountry : detail[x]['country'],
            associateStatus : detail[x]['status'],
            associatePhone : detail[x]['phone']
          }
        )
      }
      console.log(this.search_table_data)
      this.displayedColumns=['associateID','associateFullName','associateCountry','associatePhone','associateStatus'];
      this.dataSource=this.search_table_data
    });

  }
}
