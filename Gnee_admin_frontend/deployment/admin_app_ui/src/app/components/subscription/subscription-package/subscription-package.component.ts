import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Table } from 'primeng/table';
import {ConfirmationService} from "primeng/api";

export interface subscriptionTableInterface {
  subscriptionName: string;
  subscriptionCode: string;
  subscriptionID: string;
  subscriptionStatus: string;
}

@Component({
  selector: 'app-subscription-package',
  templateUrl: './subscription-package.component.html',
  styleUrls: ['./subscription-package.component.css']
})
export class SubscriptionPackageComponent implements OnInit {

  @ViewChild('dt') table: Table;
  token:string
  table_list:any
  dataSource:any=null;
  displayedColumns:any=null;
  error_message:any;
  search_table_data:subscriptionTableInterface[]=[]
  
  

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
        this.deleteModelCategory(id)
      },
      reject: () => {
        console.log('rejected')
      }
    });
  }
  
  deleteModelCategory(id:string){
    console.log(id)
    const deleteURL="/api/subs/delete/"+id
    const headers = {'Authorization' : this.token}
    console.log(deleteURL)
    this.http.delete(deleteURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      location.reload()
    });
  }

  getTableData(){
    const getURL ="/api/subs/list"
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
            subscriptionName : detail[x]['subscription_name'],
            subscriptionCode: detail[x]['subscription_code'],
            subscriptionID : detail[x]['subscription_type_id'], 
            subscriptionStatus : detail[x]['is_active'],
           
          }
        )
      }
      console.log(this.search_table_data)
      this.displayedColumns=['subscriptionName','subscriptionCode','subscriptionID','subscriptionStatus'];
      this.dataSource=this.search_table_data
    });

  }

}
