import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { FormBuilder, FormGroup ,Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {
  
  error_message:any
  country_dict:any
  role_dict:any
  dropdown_disable: boolean = true
  token:string
  id:string
  mode:string
  associateForm:FormGroup
  first_name:string
  last_name:string
  role:string
  address_line_1: string
  address_line_2: string
  address_line_3: string
  postcode:string
  county:string
  country:string
  contact_number:string
  secondry_contact:string
  personal_email:string
  email:string
  status:string
  login_id:string
  country_list:any
  role_list:any
  reverse_role_list:any
  
  constructor(
    private route : ActivatedRoute,
    private http: HttpClient,
    private fb : FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('session_token')
    this.id=this.route.snapshot.params['id']
    this.mode=this.route.snapshot.params['mode']
    sessionStorage.setItem('associate_id',this.id)
    switch(this.mode)
    {
      case 'add':
        console.log('add')
        this.intializeForm()
        this.getRoleData()
        this.getCountryData()
        break
      case 'edit':
        console.log('edit')
        this.intializeForm()
        this.getRoleData()
        this.getCountryData()
        this.getAssociateData()
        break
      case 'view':
        console.log('view')
        this.intializeForm()
        this.getRoleData()
        this.getCountryData()
        this.getAssociateData()
        break        
    }
  }
  getRoleData(){
    var getURL="/api/roles/list"
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log('role',response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      var detail=JSON.parse(body['detail'])
      this.role_list=detail
      console.log(this.role_list)
      var keys =[]
      var values =[]
      for (var x in this.role_list){
        keys.push(this.role_list[x]['role'])
        values.push(this.role_list[x]['role_id'])
      }
      this.role_dict=(this.Arr2object(keys, values))
      this.reverse_role_list=(this.Arr2object(values,keys))
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
    .subscribe(response => {
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

  getAssociateData(){
    var getURL ="/api/associates/view/"+sessionStorage.getItem('associate_id')
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      var detail=JSON.parse(body['detail'])
      console.log(detail)
      this.first_name=detail[0]['first_name']
      this.last_name=detail[0]['last_name']
      this.role=this.reverse_role_list[detail[0]['role_id']]
      this.address_line_1=detail[0]['address_line_1']
      this.address_line_2=detail[0]['address_line_2']
      this.address_line_3=detail[0]['address_line_3']
      this.postcode=detail[0]['postcode']
      this.county=detail[0]['county']
      this.country=detail[0]['country']
      this.contact_number=detail[0]['contact_number']
      this.secondry_contact=detail[0]['secondry_contact']
      this.personal_email=detail[0]['personal_email']
      this.email=detail[0]['email']
      this.login_id=detail[0]['login_id']
      this.status=detail[0]['status']
      console.log(this.first_name)
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushFormValues()
      }
    })
  }

  updateAssociateData(){
    var putURL ="/api/associates/update/"+sessionStorage.getItem('associate_id')
    const headers = {'Authorization' : this.token}
    var country_update=this.associateForm.value['country']
    var raw_data= {
      "first_name": this.associateForm.value['first_name'],
      "last_name":  this.associateForm.value['last_name'],
      "country": this.country_dict[this.associateForm.value['country']].toString(),
      "county": this.associateForm.value['county'],
      "postcode": this.associateForm.value['postcode'],
      "address_line_1": this.associateForm.value['address_line_1'],
      "address_line_2": this.associateForm.value['address_line_2'],
      "address_line_3": this.associateForm.value['address_line_3'],
      "contact_number": this.associateForm.value['contact_number'],
      "secondry_contact": this.associateForm.value['secondry_contact'],
      "email": this.associateForm.value['email'],
      "personal_email": this.associateForm.value['personal_email'],
      "status": this.associateForm.value['status'],
          }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('administrator/associate/details/'+this.id+'/view')  
      this.mode='view'
    });
  }

  createAssociateData(){
    var postURL ="/api/associates/add"
    const headers = {'Authorization' : this.token}
    console.log(this.country_dict)
    console.log(this.country_dict[this.associateForm.value['country']])
    var raw_data= {
      "first_name": this.associateForm.value['first_name'],
      "last_name":  this.associateForm.value['last_name'],
      "country": this.country_dict[this.associateForm.value['country']],
      "county": this.associateForm.value['county'],
      "postcode": this.associateForm.value['postcode'],
      "address_line_1": this.associateForm.value['address_line_1'],
      "address_line_2": this.associateForm.value['address_line_2'],
      "address_line_3": this.associateForm.value['address_line_3'],
      "contact_number": this.associateForm.value['contact_number'],
      "secondry_contact": this.associateForm.value['secondry_contact'],
      "email": this.associateForm.value['email'],
      "personal_email": this.associateForm.value['personal_email'],
      "login_id": this.associateForm.value['login_id'],
      "password": "Mypass123",
      "status": this.associateForm.value['status'],
        }
      console.log(raw_data)
        this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          console.log(response)
          this.router.navigateByUrl('administrator/associate')
        });
  }

  intializeForm(){
    this.associateForm=this.fb.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      role:['',Validators.required],
      address_line_1: ['',Validators.required],
      address_line_2: ['',Validators.required],
      address_line_3: ['',Validators.required],
      postcode:['',Validators.required],
      county:['',Validators.required],
      country:['',Validators.required],
      contact_number:['',Validators.required],
      secondry_contact:['',Validators.required],
      personal_email:['',Validators.required],
      email:['',Validators.required],
      status:['',Validators.required],
      login_id:['',Validators.required],
    });
  }

  pushFormValues(){
    console.log(this.country)
    this.associateForm.patchValue({
      first_name:this.first_name,
      last_name: this.last_name,
      role:this.role,
      address_line_1:this.address_line_1 ,
      address_line_2:this.address_line_2,
      address_line_3:this.address_line_3,
      postcode:this.postcode,
      county:this.county,
      country:this.country,
      contact_number:this.contact_number,
      secondry_contact:this.secondry_contact,
      personal_email:this.personal_email,
      email:this.email,
      login_id:this.login_id,
      status:this.status
    });
    console.log(this.associateForm.value['first_name'])
  }

  onEdit(){
    this.router.navigateByUrl('administrator/associate/details/'+this.id+'/edit')  
    this.mode='edit'
  }

  onSave(){
    this.updateAssociateData()
  }

  onCancel(){
    this.router.navigateByUrl('administrator/associate/details/'+this.id+'/view')  
    this.mode='view'
  }

  onAddCancel(){
    this.router.navigateByUrl('administrator/associate')
  }

  onAdd(){
    this.createAssociateData()
    //this.router.navigateByUrl('/administrator/details/'+'CreatedClientId'+'/view')  
    //this.mode='view'
  }
}
