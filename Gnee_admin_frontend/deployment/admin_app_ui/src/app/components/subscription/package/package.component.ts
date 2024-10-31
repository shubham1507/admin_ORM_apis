import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Table } from 'primeng/table';
import {ConfirmationService} from "primeng/api";

export interface associateTableInterface {
  packageCode: string;
  packageID: string;
  packageStatus: string;
}

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

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
        this.deleteProductCategory(id)
      },
      reject: () => {
        console.log('rejected')
      }
    });
  }
  
  deleteProductCategory(id:string){
    console.log(id)
    const deleteURL="/api/package/delete/"+id
    const headers = {'Authorization' : this.token}
    console.log(deleteURL)
    this.http.delete(deleteURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      location.reload()
    });
  }

  getTableData(){
    const getURL ="/api/package/list"
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
            packageCode : detail[x]['pkg_code'],
            packageID : detail[x]['pkg_id'], 
            packageStatus : detail[x]['is_active'],
           
          }
        )
      }
      console.log(this.search_table_data)
      this.displayedColumns=['packageCode','packageID','packageStatus'];
      this.dataSource=this.search_table_data
    });

  }

}
