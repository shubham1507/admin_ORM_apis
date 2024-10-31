import { Component,Input, OnInit, Output,EventEmitter,ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {ConfirmationService} from "primeng/api";


import { HttpClient } from '@angular/common/http';


export interface clientTableInterface {
  clientFullName: string;
  primemail: string;
  primecontact:number;
  isChecked: any;
  clientID:string;

}
@Component({
  selector: 'app-client-onboarding',
  templateUrl: './client-onboarding.component.html',
  styleUrls: ['./client-onboarding.component.css']
})
export class ClientSupportComponent implements OnInit {

  token:string
  clients: any;
  currentIndex = -1;
  client_name = '';
  
  table_list:any
  dataSource:any=null;
  displayedColumns:any=null;
  search_table_data:clientTableInterface[]=[]
  @ViewChild('dt') table: Table;
  id: string;
  
  

  constructor(private http: HttpClient,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('session_token')
    sessionStorage.setItem('client_id',this.id)
    this.getTableData();
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
        this.deleteClient(id)
      },
      reject: () => {
        console.log('rejected')
      }
    });
  }

  deleteClient(id:any){
    const deleteURL="/api/client/delete/"+id
    const headers = {'Authorization' : this.token}
    console.log(deleteURL)
    this.http.delete(deleteURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      location.reload()
    });
  }
  
  getTableData(){
    const getURL ="/api/client/list"
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
            clientFullName : detail[x]['client_name'],
            primemail:detail[x]['client_comms_email'],
            primecontact:detail[x]['client_comms_contact_number'],
            clientID: detail[x]['client_id'],
            isChecked : detail[x]['is_active'],
          }
        )
      }
      this.displayedColumns=['search_full_name','search_patient_id'];
      this.dataSource=this.search_table_data
    });

  }
}
