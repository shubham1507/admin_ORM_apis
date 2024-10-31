import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { FormBuilder, FormGroup ,Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-service-details',
  templateUrl: './product-service-details.component.html',
  styleUrls: ['./product-service-details.component.css']
})
export class ProductServiceDetailsComponent implements OnInit {

  error_message:any
  country_dict:any
  role_dict:any
  dropdown_disable: boolean = true
  token:string
  id:string
  mode:string
  productServiceForm:FormGroup

  country:string
  country_list:any
  role_list:any
  reverse_role_list:any

  created_by:string
  created_on:string
  is_active:string
  last_updated:string
  service_id:string
  service_name:string
  updated_by:string
  service_desc:string
  
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
    sessionStorage.setItem('service_id',this.id)
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
        this.getProdServiceData()
        break
      case 'view':
        console.log('view')
        this.intializeForm()
        this.getRoleData()
        this.getCountryData()
        this.getProdServiceData()
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

  getProdServiceData(){ //solved
    var getURL ="/api/service/view/"+sessionStorage.getItem('service_id')
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      var detail=JSON.parse(body['detail'])
      console.log(detail)
      this.created_by=detail[0]['created_by']
      this.created_on=detail[0]['created_on']
      this.is_active=detail[0]['is_active']
      this.last_updated=detail[0]['last_updated']
      this.service_id=detail[0]['service_id']
      this.service_name=detail[0]['service_name']
      this.updated_by=detail[0]['updated_by']
      this.service_desc=detail[0]['service_desc']
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushFormValues()
      }
    })
  }

  updateProdServiceData(){
    var putURL ="/api/service/update/"+sessionStorage.getItem('service_id')
    const headers = {'Authorization' : this.token}
    var country_update=this.productServiceForm.value['country']
    var raw_data= {
      "is_active": this.productServiceForm.value['is_active'],
      "service_name": this.productServiceForm.value['service_name'],
      "service_desc": this.productServiceForm.value['service_desc']
          }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('administrator/subscription/product-service/details/'+this.id+'/view')  
      this.mode='view'
    });
  }

  createProdServiceData(){
    var postURL ="/api/service/add"
    const headers = {'Authorization' : this.token}
    console.log(this.country_dict)
    console.log(this.country_dict[this.productServiceForm.value['country']])
    var raw_data= {
      "is_active": this.productServiceForm.value['is_active'],
      "service_name": this.productServiceForm.value['service_name'],
      "updated_by":3,
      "service_desc": this.productServiceForm.value['service_desc']
        }
      console.log(raw_data)
        this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          console.log(response)
          this.router.navigateByUrl('administrator/subscription/product-service')
        });
  }

  intializeForm(){ //solved
    this.productServiceForm=this.fb.group({
      created_by:['',Validators.required],
      created_on:['',Validators.required],
      is_active:['',Validators.required],
      last_updated:['',Validators.required],
      service_name:['',Validators.required],
      service_id:['',Validators.required],
      service_desc:['',Validators.required], 
      updated_by:['',Validators.required], 
    });
  }

  pushFormValues(){
    console.log(this.country)
    this.productServiceForm.patchValue({
      created_by:this.created_by,
      created_on:this.created_on,
      is_active:this.is_active,
      last_updated:this.last_updated,
      service_id:this.service_id,
      service_name:this.service_name,
      updated_by:this.updated_by,
      service_desc:this.service_desc
    });
  }

  onEdit(){ //solved
    this.router.navigateByUrl('administrator/subscription/product-service/details/'+this.id+'/edit')  
    this.mode='edit'
  }

  onSave(){
    this.updateProdServiceData()
  }

  onCancel(){ //solved
    this.router.navigateByUrl('administrator/subscription/product-service/details/'+this.id+'/view')  
    this.mode='view'
  }

  onAddCancel(){
    this.router.navigateByUrl('administrator/subscription/product-service')
  }

  onAdd(){
    this.createProdServiceData()
    //this.router.navigateByUrl('/administrator/details/'+'CreatedClientId'+'/view')  
    //this.mode='view'
  }

}
