import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import {ConfirmationService} from "primeng/api";



export interface countryTableInterface {
  country_id: string;
  country_name: string;
  country_code: string;
}

@Component({
  selector: 'app-country-onboarding',
  templateUrl: './country-onboarding.component.html',
  styleUrls: ['./country-onboarding.component.css']
})
export class CountryOnboardingComponent implements OnInit {


  token:string
  table_list:any
  dataSource:any=null;
  displayedColumns:any=null;
  search_table_data:countryTableInterface[]=[]
  @ViewChild('dt') table: Table;
  

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService
  ) { }
  
  getTableData(){
    const getURL ="/api/country/list"
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
            country_id : detail[x]['country_id'],
            country_name : detail[x]['country_name'],
            country_code : detail[x]['country_code']
          }
        )
      }
      console.log(this.search_table_data)
      this.displayedColumns=['country_id','country_name','country_code'];
      this.dataSource=this.search_table_data
    });

  }
  ngOnInit(): void {


    this.token=localStorage.getItem('session_token')
    this.getTableData()

  }
  applyFilterGlobal($event:any, stringVal:any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

}
