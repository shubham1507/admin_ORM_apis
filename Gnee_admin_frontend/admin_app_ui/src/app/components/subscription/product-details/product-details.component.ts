import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { FormBuilder, FormGroup ,Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

 
  
  error_message:any
  country_dict:any
  role_dict:any
  dropdown_disable: boolean = true
  token:string
  id:string
  mode:string
  productForm:FormGroup
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

  created_by:string
  created_on:string
  is_active:string
  last_updated:string
  product_id:string
  product_name:string
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
    sessionStorage.setItem('product_id',this.id)
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
        this.getProductData()
        break
      case 'view':
        console.log('view')
        this.intializeForm()
        this.getRoleData()
        this.getCountryData()
        this.getProductData()
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

  getProductData(){ //solved
    var getURL ="/api/product/view/"+sessionStorage.getItem('product_id')
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
      this.product_id=detail[0]['product_id']
      this.product_name=detail[0]['product_name']
      this.updated_by=detail[0]['updated_by']
      
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushFormValues()
      }
    })
  }

  updateProductData(){
    var putURL ="/api/product/update/"+sessionStorage.getItem('product_id')
    const headers = {'Authorization' : this.token}
    var country_update=this.productForm.value['country']
    var raw_data= {
      "created_by": this.productForm.value['created_by'],
      "created_on":  this.productForm.value['created_on'],
      "is_active": this.productForm.value['is_active'],
      "last_updated": this.productForm.value['last_updated'],
      "product_id": this.productForm.value['product_id'],
      "product_name": this.productForm.value['product_name'],
      "updated_by": this.productForm.value['updated_by'],
          }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('administrator/subscription/product/details/'+this.id+'/view')  
      this.mode='view'
    });
  }

  createProductData(){
    var postURL ="/api/product/add"
    const headers = {'Authorization' : this.token}
    console.log(this.country_dict)
    console.log(this.country_dict[this.productForm.value['country']])
    var raw_data= {
      "is_active": this.productForm.value['is_active'],
      "product_name": this.productForm.value['product_name'],
      "updated_by": 3
        }
      console.log(raw_data)
        this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          console.log(response)
          this.router.navigateByUrl('administrator/subscription/product')
        });
  }

  intializeForm(){ //solved
    this.productForm=this.fb.group({
      created_by:['',Validators.required],
      created_on:['',Validators.required],
      is_active:['',Validators.required],
      last_updated:['',Validators.required],
      product_id:['',Validators.required],
      product_name:['',Validators.required],
      prod_cat_id:['',Validators.required],
      updated_by:['',Validators.required]
    });
  }

  pushFormValues(){ //solved
    console.log(this.country)
    this.productForm.patchValue({
      created_by:this.created_by,
      created_on:this.created_on,
      is_active:this.is_active,
      last_updated:this.last_updated,
      product_id:this.product_id,
      product_name:this.product_name,
      updated_by:this.updated_by
    });
    console.log(this.productForm.value['first_name'])
  }

  onEdit(){ //solved
    this.router.navigateByUrl('administrator/subscription/product/details/'+this.id+'/edit')  
    this.mode='edit'
  }

  onSave(){
    this.updateProductData()
  }

  onCancel(){ //solved
    this.router.navigateByUrl('administrator/subscription/product/details/'+this.id+'/view')  
    this.mode='view'
  }

  onAddCancel(){
    this.router.navigateByUrl('administrator/subscription/product')
  }

  onAdd(){
    this.createProductData()
    //this.router.navigateByUrl('/administrator/details/'+'CreatedClientId'+'/view')  
    //this.mode='view'
  }
}
