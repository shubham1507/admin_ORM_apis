import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { FormBuilder, FormGroup ,Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-subscription-package-details',
  templateUrl: './subscription-package-details.component.html',
  styleUrls: ['./subscription-package-details.component.css']
})
export class SubscriptionPackageDetailsComponent implements OnInit {

  error_message:any
  country_dict:any
  role_dict:any
  dropdown_disable: boolean = true
  token:string
  id:string
  mode:string
  modelForm:FormGroup
  login_id:string
  country_list:any
  role_list:any
  reverse_role_list:any
  country:string
  created_by:string
  created_on:string
  is_active:string
  last_updated:string
  subscription_type_id :string
  subscription_name:string
  subscription_code:string
  description:string
  updated_by:string
  
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
    sessionStorage.setItem('subscription_type_id ',this.id)
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
        this.getSubscriptionData()
        break
      case 'view':
        console.log('view')
        this.intializeForm()
        this.getRoleData()
        this.getCountryData()
        this.getSubscriptionData()
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

  getSubscriptionData(){ //solved
    var getURL ="/api/subs/view/"+sessionStorage.getItem('subscription_type_id ')
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
      this.subscription_type_id =detail[0]['subscription_type_id']
      this.subscription_name=detail[0]['subscription_name']
      this.updated_by=detail[0]['updated_by']
      this.subscription_code=detail[0]['subscription_code']
      this.description=detail[0]['description']
      
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushFormValues()
      }
    })
  }

  updateSubscriptionData(){
    var putURL ="/api/subs/update/"+sessionStorage.getItem('subscription_type_id ')
    const headers = {'Authorization' : this.token}
    var country_update=this.modelForm.value['country']
    var raw_data= {
      "is_active": this.modelForm.value['is_active'],
      "subscription_name": this.modelForm.value['subscription_name'],
      "description": this.modelForm.value['description'],
      "subscription_code":this.modelForm.value['subscription_code'],
          }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('administrator/subscription/subscription-package/details/'+this.id+'/view')  
      this.mode='view'
    });
  }

  createSubscriptionData(){
    var postURL ="/api/subs/add"
    const headers = {'Authorization' : this.token}
    console.log(this.country_dict)
    console.log(this.country_dict[this.modelForm.value['country']])
    var raw_data= {
      "is_active": this.modelForm.value['is_active'],
      "subscription_name": this.modelForm.value['subscription_name'],
      "description": this.modelForm.value['description'],
      "subscription_code":this.modelForm.value['subscription_code'],
          }
      console.log(raw_data)
        this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          console.log(response)
          this.router.navigateByUrl('administrator/subscription/subscription-package')
        });
  }

  intializeForm(){ //solved
    this.modelForm=this.fb.group({
      created_by:['',Validators.required],
      created_on:['',Validators.required],
      is_active:['',Validators.required],
      last_updated:['',Validators.required],
      subscription_type_id :['',Validators.required],
      subscription_name:['',Validators.required],
      subscription_code:['',Validators.required],
      description:['',Validators.required],
      updated_by:['',Validators.required]
    });
  }

  pushFormValues(){ //solved
    console.log(this.country)
    this.modelForm.patchValue({
      created_by:this.created_by,
      created_on:this.created_on,
      is_active:this.is_active,
      last_updated:this.last_updated,
      subscription_type_id :this.subscription_type_id ,
      subscription_name:this.subscription_name,
      subscription_code:this.subscription_code,
      description:this.description,
      updated_by:this.updated_by
    });
    console.log(this.modelForm.value['first_name'])
  }

  onEdit(){ //solved
    this.router.navigateByUrl('administrator/subscription/subscription-package/details/'+this.id+'/edit')  
    this.mode='edit'
  }

  onSave(){
    this.updateSubscriptionData()
  }

  onCancel(){ //solved
    this.router.navigateByUrl('administrator/subscription/subscription-package/details/'+this.id+'/view')  
    this.mode='view'
  }

  onAddCancel(){
    this.router.navigateByUrl('administrator/subscription/subscription-package')
  }

  onAdd(){
    this.createSubscriptionData()
    //this.router.navigateByUrl('/administrator/details/'+'CreatedClientId'+'/view')  
    //this.mode='view'
  }

}
