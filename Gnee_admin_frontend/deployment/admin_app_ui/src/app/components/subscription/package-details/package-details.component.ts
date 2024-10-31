import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { FormBuilder, FormGroup ,Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {


  error_message:any
  country_dict:any
  role_dict:any
  dropdown_disable: boolean = true
  token:string
  id:string
  mode:string
  packageForm:FormGroup
  country_list:any
  role_list:any
  reverse_role_list:any
  country:string
  created_by:string
  created_on:string
  is_active:string
  last_updated:string
  pkg_id:string
  pkg_code:string
  pkg_desc:string
  pkg_validity:string
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
    sessionStorage.setItem('pkg_id',this.id)
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
        this.getPackageData()
        break
      case 'view':
        console.log('view')
        this.intializeForm()
        this.getRoleData()
        this.getCountryData()
        this.getPackageData()
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

  getPackageData(){ //solved
    var getURL ="/api/package/view/"+sessionStorage.getItem('pkg_id')
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
      this.pkg_id=detail[0]['pkg_id']
      this.pkg_code=detail[0]['pkg_code']
      this.updated_by=detail[0]['updated_by']
      this.pkg_desc=detail[0]['pkg_desc']
      this.pkg_validity=detail[0]['pkg_validity']
      
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushFormValues()
      }
    })
  }

  updatePackageData(){
    var putURL ="/api/package/update/"+sessionStorage.getItem('pkg_id')
    const headers = {'Authorization' : this.token}
    var country_update=this.packageForm.value['country']
    var raw_data= 
      {
        "pkg_code":this.packageForm.value['pkg_code'],
        "pkg_desc":this.packageForm.value['pkg_desc'],
        "pkg_validity":this.packageForm.value['pkg_validity'],
        "is_active":this.packageForm.value['is_active']
      }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('administrator/subscription/package/details/'+this.id+'/view')  
      this.mode='view'
    });
  }

  createPackageData(){
    var postURL ="/api/package/add"
    const headers = {'Authorization' : this.token}
    console.log(this.country_dict)
    console.log(this.country_dict[this.packageForm.value['country']])
    var raw_data= {
      "pkg_code":this.packageForm.value['pkg_code'],
      "pkg_desc":this.packageForm.value['pkg_desc'],
      "pkg_validity":this.packageForm.value['pkg_validity'],
      "is_active":this.packageForm.value['is_active']
    }
      console.log(raw_data)
        this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          console.log(response)
          this.router.navigateByUrl('administrator/subscription/package')
        });
  }

  intializeForm(){ //solved
    this.packageForm=this.fb.group({
      created_by:['',Validators.required],
      created_on:['',Validators.required],
      is_active:['',Validators.required],
      last_updated:['',Validators.required],
      pkg_id:['',Validators.required],
      pkg_code:['',Validators.required],
      prod_cat_id:['',Validators.required],
      updated_by:['',Validators.required],
      pkg_desc:['',Validators.required],
      pkg_validity:['',Validators.required]
      
    });
  }

  pushFormValues(){ //solved
    console.log(this.country)
    this.packageForm.patchValue({
      created_by:this.created_by,
      created_on:this.created_on,
      is_active:this.is_active,
      last_updated:this.last_updated,
      pkg_id:this.pkg_id,
      pkg_code:this.pkg_code,
      pkg_desc:this.pkg_desc,
      pkg_validity:this.pkg_validity,
      updated_by:this.updated_by
    });
    console.log(this.packageForm.value['first_name'])
  }

  onEdit(){ //solved
    this.router.navigateByUrl('administrator/subscription/package/details/'+this.id+'/edit')  
    this.mode='edit'
  }

  onSave(){
    this.updatePackageData()
  }

  onCancel(){ //solved
    this.router.navigateByUrl('administrator/subscription/package/details/'+this.id+'/view')  
    this.mode='view'
  }

  onAddCancel(){
    this.router.navigateByUrl('administrator/subscription/package')
  }

  onAdd(){
    this.createPackageData()
    //this.router.navigateByUrl('/administrator/details/'+'CreatedClientId'+'/view')  
    //this.mode='view'
  }

}
