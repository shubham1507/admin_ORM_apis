import { Component,ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,FormControl} from "@angular/forms";
import { Routes, RouterModule, ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Table } from 'primeng/table';
import {ConfirmationService} from "primeng/api";


export interface clientUserTableInterface {
  firstName: string;
  lastName: string;
  primEmail: string;
  clientUserID: string;
  clientID: string;
  status: any;
  contact_number:number;
  
}

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
 
  u_id: any;
  users: any;
  currentIndex = -1;
  client_user_name = '';
  dropdown_disable: boolean = true
  tab:string
  token:string
  id:string
  mode:string
  clientdetailForm:FormGroup
  clientuserdetailForm:FormGroup
  client_name:string
  client_status:boolean
  client_website:string
  registered_in_country:string
  registration_id:string
  default_currency_used:string
  vat_number:string
  VAT_used:string
  is_active:string
  address_line_1: string
  address_line_2: string
  address_line_3: string
  postcode:string
  county:string
  country:string
  client_comms_name:string
  client_comms_email:string
  client_comms_contact_number:any
  client_techSupp_name:string
  client_techSupp_email:string
  client_techSupp_contact_number:string
  client_finance_name:string
  client_finance_email:string
  client_finance_contact_number:string
  client_finance_contact_name:string
  contract_signed_by:string
  country_dict:any
  country_list:any
  table_list: any;

  search_table_data: clientUserTableInterface[]=[]
  @ViewChild('dt') table: Table;


  displayedColumns: any=null;
  dataSource: any=null;
  isContent: boolean;
  
  
  constructor(
    private confirmationService: ConfirmationService,
    private route : ActivatedRoute,
    private http: HttpClient,
    private fb : FormBuilder,
    private router: Router
  ) { }
    
  ngOnInit(): void {

    this.token=localStorage.getItem('session_token')
    this.id=this.route.snapshot.params['id']
    this.u_id=this.route.snapshot.params['u_id']

    this.mode=this.route.snapshot.params['mode']
    sessionStorage.setItem('client_id',this.id)
    sessionStorage.setItem('client_user_id',this.u_id)

    this.tab="Client Details"
    this.getUserTableData();


    switch(this.mode)
    {
      case 'add':
        console.log('add')
        this.intializeForm()
        this.getCountryData()
        break
      case 'edit':
        console.log('edit')
        this.intializeForm()
        this.getClientData()
        this.getCountryData()
        break
      case 'view':
        console.log('view')
        this.intializeForm()
        this.getClientData()
        this.getCountryData()
        break        
    }
  }


  confirm(event: Event,id:string,u_id:string) {
    console.log("clicked")
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to delete?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteClientUser(id,u_id)
      },
      reject: () => {
        console.log('rejected')
      }
    });
  }
  
  deleteClientUser(id:string,u_id:string){
    const deleteURL="/api/client/users/delete/"+id +"/"+u_id
    const headers = {'Authorization' : this.token}
    console.log(deleteURL)
    this.http.delete(deleteURL ,{headers,observe: 'response'})
    .subscribe((response: any) => {
      console.log(response)
      location.reload()
    });
  }



  getClientData(){
    var getURL ="/api/client/view/"+sessionStorage.getItem('client_id')
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe((response: { [x: string]: any; body: any; }) => {
      var body:any =response['body']
      var detail=body['detail']

      var body=JSON.parse((JSON.stringify(response['body'])))

                    var detail = JSON.parse(body['detail']) 

                    
                    detail= detail.map((_element: any)=>{
                      
                      _element = JSON.stringify(_element).split(" ").join("");
                      _element=JSON.parse(_element)
                      return _element
                    })

      this.client_name=detail[0]['client_name']
      this.client_techSupp_contact_number=detail[0]['"client_techSupp_contact_number"']
      this.client_techSupp_email=detail[0]['"client_techSupp_email"']
      this.address_line_1=detail[0]['address_line_1']
      this.address_line_2=detail[0]['address_line_2']
      this.address_line_3=detail[0]['address_line_3']
      this.postcode=detail[0]['postcode']
      this.county=detail[0]['county']
      this.country=detail[0]['country']
      this.client_comms_contact_number=detail[0]['client_comms_contact_number']
      this.client_techSupp_name=detail[0]['"client_techSupp_name"']
      this.vat_number=detail[0]['vat_number']
      this.VAT_used=detail[0]['"VAT_used"']
      this.client_finance_contact_name=detail[0]["client_finance_contact_name"]
      this.client_finance_email=detail[0]['client_finance_email']
      if (detail[0]['client_finance_contact_number']==null){
        this.client_finance_contact_number = 'None'
      }
      else{

        this.client_finance_contact_number=detail[0]['client_finance_contact_number']


      }
      this.is_active=detail[0]['is_active']
      this.contract_signed_by=detail[0]['contract_signed_by']
      this.registered_in_country=detail[0]['registered_in_country']
      this.registration_id=detail[0]['registration_id']
      this.default_currency_used=detail[0]['default_currency_used']
      this.client_website=detail[0]['client_website']
      this.client_comms_email=detail[0]['client_comms_email']

      
      console.log(this.client_name)
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushFormValues(response.body)
      }
      
    })
  }


  applyFilterGlobal($event:any, stringVal:any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  
  getUserTableData(){
    const getURL ="/api/client/users/list/"+this.id
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe((response: { [x: string]: any; }) => {
      if (response.body == null){
        this.isContent = false;
      }
      else{
        this.isContent = true;
      }
      console.log(response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      var detail=JSON.parse(body['detail'])
      console.log(detail)
      this.table_list=detail
      
      for (var x in detail){
        console.log(detail[x])
        this.search_table_data.push(
          {
            firstName : detail[x]['first_name'],

            lastName : detail[x]['last_name'],

            primEmail:detail[x]['email'],

            clientUserID :detail[x]['client_user_id'],

            clientID :detail[x]['client_id'],


            status : detail[x]['status'],

            contact_number:detail[x]['contact_number']


          }
        )
      }
      console.log(this.search_table_data)
      this.displayedColumns=['search_full_name','search_patient_id'];
      this.dataSource=this.search_table_data
    });

  }
  updateClientData(){

    var putURL ="/api/client/update/"+sessionStorage.getItem('client_id')
    const headers = {'Authorization' : this.token}
    var raw_data= {

      "client_name":this.clientdetailForm.value['client_name'],
      "client_techSupp_contact_number":this.clientdetailForm.value['"client_techSupp_contact_number"'],
      "client_techSupp_email":this.clientdetailForm.value['"client_techSupp_email"'],
      "address_line_1":this.clientdetailForm.value['address_line_1'],
      "address_line_2":this.clientdetailForm.value['address_line_2'],
      "address_line_3":this.clientdetailForm.value['address_line_3'],
      "postcode":this.clientdetailForm.value['postcode'],
      "county":this.clientdetailForm.value['county'],
      "country":this.clientdetailForm.value['country'],
      "client_comms_contact_number":this.clientdetailForm.value['client_comms_contact_number'],
      "client_techSupp_name":this.clientdetailForm.value['"client_techSupp_name"'],
      "vat_number":this.clientdetailForm.value['"vat_number"'],
      "VAT_used":this.clientdetailForm.value['"VAT_used"'],
      "client_finance_contact_name":this.clientdetailForm.value["client_finance_contact_name"],
      "client_finance_email":this.clientdetailForm.value['client_finance_email'],
      "client_finance_contact_number":this.clientdetailForm.value['client_finance_contact_number'],
      "registered_in_country":this.clientdetailForm.value['registered_in_country'],
      "registration_id":this.clientdetailForm.value['registration_id'],
      "default_currency_used":this.clientdetailForm.value['default_currency_used'],
      "client_website":this.clientdetailForm.value['client_website'],
      "client_comms_email":this.clientdetailForm.value['client_comms_email'],
      "contract_signed_by":this.clientdetailForm.value['contract_signed_by'],

      "client_status_id":41,
      "client_secret":"xxx",
      "contract_temp_id":51,
      "note_id":6,
      
      "is_active": true,

          }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe((response: any) => {
      console.log(response)
      this.router.navigateByUrl('/client-dashboard/detail/'+this.id+'/view')  
      this.mode='view'
    });
  }



  createClientData(){
    var postURL ="/api/client/add"
    var raw_data= {
      ...this.clientdetailForm.value,

      "client_status_id":41,
      "client_secret":'xxx',
      "contract_temp_id":51,
      "note_id":6,
      "logo":null,
      "country":3
      
        }
        let options = {
          headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization' ,this.token)
          
      };
        this.http.post(postURL,raw_data,options)
        .subscribe((response: any) => {
          console.log(response,"created client")
          this.router.navigateByUrl('client-dashboard/management')
        });
  }

  Arr2object(keys:any, vals:any) {
    return keys.reduce(
      function(prev:any, val:any, i:any) {
        prev[val] = vals[i];
        return prev;
      }, {}
    );
  }

  getCountryData(){
    var getURL="/api/country/list"
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe((response: { [x: string]: any; }) => {
      console.log('country',response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      var detail=JSON.parse(body['detail'])
      this.country_list=detail
      console.log(this.country_list)
      var keys =[]
      var values =[]
      for (var x in this.country_list){
        keys.push(this.country_list[x]['country_name'])
        values.push(this.country_list[x]['country_id'])
      }
      this.country_dict=(this.Arr2object(keys, values))
    });
  }


  intializeForm(){
    this.clientdetailForm=this.fb.group({
      client_name:['',[Validators.required]],
      client_techSupp_contact_number:['',],
      client_website:['',],
      registered_in_country:['',],
      registration_id:[''],
      vat_number:[''],
      VAT_used:[''],

      address_line_1: ['',],
      address_line_2: ['',],
      address_line_3: ['',],

      postcode:['',],
      county:['',],
      country:['',],

      client_comms_contact_number:['',],
      client_comms_email:['',],
      client_finance_email:['',],
      client_techSupp_email:['',],
      client_techSupp_name:[''],
      client_finance_contact_name:[''],
      client_finance_contact_number:[''],
      default_currency_used:[''],
      contract_signed_by:[''],
      is_active:['',Validators.required],
     
      
      
    });
  }
  

  onSubmit(){
    console.log(this.clientdetailForm.value);
  }

  pushFormValues(response:any){
      this.clientdetailForm.patchValue({
      // ...response['detail'][0]
      
      client_name:this.client_name,
      client_techSupp_contact_number:this.client_techSupp_contact_number,
      address_line_1:this.address_line_1 ,
      address_line_2:this.address_line_2,
      address_line_3:this.address_line_3,
      postcode:this.postcode,
      county:this.county,
      country:this.country,
      client_comms_contact_number:this.client_comms_contact_number,
      client_techSupp_name:this.client_techSupp_name,
      vat_number:this.vat_number,
      VAT_used:this.VAT_used,
      client_website:this.client_website,
      client_finance_contact_name:this.client_finance_contact_name,
      client_finance_email:this.client_finance_email,
      client_finance_contact_number:this.client_finance_contact_number,
      contract_signed_by:this.contract_signed_by,
      is_active:this.is_active,
      registered_in_country:this.registered_in_country,
      registration_id:this.registration_id,
      default_currency_used:this.default_currency_used,
      client_techSupp_email:this.client_techSupp_email,
      client_comms_email:this.client_comms_email

      
    });
    console.log(this.clientdetailForm.value['client_name'])
  }


 


  onEdit(){
    this.router.navigateByUrl('client-dashboard/detail/'+this.id+'/edit')  
    this.mode='edit'
  }

  onSave(){
    this.updateClientData()
  }

  onAdd(){
   this.createClientData()
  }

  tabSelect(tab:string){
    this.tab=tab

    if(tab=="Client Subscription"){
      document.getElementById('custom-tabs-three-home-tab').className='nav-link'
      document.getElementById('custom-tabs-three-messages-tab').className='nav-link'
      document.getElementById('custom-tabs-three-profile-tab').className='nav-link active'
    }
    if(tab=="Client Details"){
      document.getElementById('custom-tabs-three-home-tab').className='nav-link active'
      document.getElementById('custom-tabs-three-messages-tab').className='nav-link'
      document.getElementById('custom-tabs-three-profile-tab').className='nav-link'
    }

    if(tab=="Client Users"){
      document.getElementById('custom-tabs-three-home-tab').className='nav-link'
      document.getElementById('custom-tabs-three-messages-tab').className='nav-link active'
      document.getElementById('custom-tabs-three-profile-tab').className='nav-link'
    }
    console.log(tab)
  }


}



