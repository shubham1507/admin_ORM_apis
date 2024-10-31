import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup ,Validators,FormControl} from "@angular/forms";


@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  display: boolean = false;
  popupContent:string;
  tab: string;
  mode: any;
  token: any;
  role: any;
  admin:any;
  status: any;
  description:string;
  roleDetailForm: FormGroup;
  permissionDetailForm: FormGroup;
  id: string;
  per_id: string
  dropdown_disable: boolean = true
  client: any;
  report: any;
  tech_sup: any;
  fin: any;
  isUpdateOperation: Boolean =  false;
  componet_list: any;
  component_dict: any;
  reverse_componet_list: any;
  status_list: any;
  status_dict: any;
  reverse_status_list: any;
  
  
  constructor(    private route : ActivatedRoute,
    private http: HttpClient,
    private fb : FormBuilder,
    private router: Router
    
    ) { }

  ngOnInit(): void {

    this.tab="Role Details",
    this.popupContent = ""
    this.token=localStorage.getItem('session_token')
    this.mode=this.route.snapshot.params['mode'],
    this.id=this.route.snapshot.params['id'],
    sessionStorage.setItem('role_id',this.id)
    this.route.params.subscribe(routeParam=>{
      
      this.mode = routeParam.mode
      switch(this.mode)
      {
        case 'add':
          this.intializeForm()
          this.getStatusData()
         
          break
        case 'edit':
          this.intializeForm()
          this.getroleData()
          this.getStatusData()
         
          this.getrolePermissionData()
          break
        case 'view':
          this.intializeForm()
          this.getroleData()
          this.getStatusData()
          this.getrolePermissionData()
          break        
      }

    })

   

  }
  showDialog() {
    this.display = true;
}


  onSubmit(){
    
    console.log(this.roleDetailForm.value);
  }
  intializeForm(){
    this.roleDetailForm=this.fb.group({
      
      role:['',Validators.required],
      status:['',Validators.required],
      description:['',Validators.required]
      
    });
    this.permissionDetailForm=this.fb.group({
      
    role:['',Validators.required],
    admin:['',Validators.required],
    client:['',Validators.required],
    tech_sup:['',Validators.required],
    fin:['',Validators.required],

    adminReport:['',Validators.required],
    clientReport:['',Validators.required],
    techReport:['',Validators.required],
    finReport:['',Validators.required],
   
     
      
    });
  }


pushRoleFormValues(){
    this.roleDetailForm.patchValue({

      role:this.role,
      status:this.status,
      description:this.description
  
  });
  
  
}

pushPermissionFormValues(){

this.permissionDetailForm.patchValue({
  admin:(this.admin)?this.admin.permissions.permission[0] : null,
  client:(this.client)?this.client.permissions.permission[0] : null,
  tech_sup:(this.tech_sup)?this.tech_sup.permissions.permission[0] : null,
  fin:(this.fin)?this.fin.permissions.permission[0] : null,
  adminReport: (this.report) ? this.report.permissions.permission.indexOf("Administrator Report") >= 0: false,
  techReport: (this.report) ? this.report.permissions.permission.indexOf("Technical Report") >= 0: false,
  clientReport: (this.report) ? this.report.permissions.permission.indexOf("Customer Report") >= 0: false,
  finReport: (this.report) ? this.report.permissions.permission.indexOf("Finance Report") >= 0: false



});


}

getStatusData(){
  var getURL="/api/status/list"
  const headers = {'Authorization' : this.token}
  this.http.get(getURL ,{headers,observe: 'response'})
  .subscribe(response => {
    console.log('status',response)
    var body=JSON.parse((JSON.stringify(response['body'])))
    var detail=JSON.parse(body['detail'])
    this.status_list=detail
    console.log(this.status_list)
    var keys =[]
    var values =[]
    for (var x in this.status_list){
      keys.push(this.status_list[x]['status'])
      values.push(this.status_list[x]['status_id'])
    }
    this.status_dict=(this.Arr2object(keys, values))
    this.reverse_status_list=(this.Arr2object(values,keys))
  });
}

  getroleData(){
    var getURL ="/api/roles/view/"+sessionStorage.getItem('role_id')
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      
      var detail=JSON.parse(body['detail'])
      this.role=detail[0]['role']
      this.status=detail[0]['status_id']
      this.description=detail[0]['description']
      

      
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushRoleFormValues()
      }
    })
  }


  Arr2object(keys:any, vals:any) {
    return keys.reduce(
      function(prev:any, val:any, i:any) {
        prev[val] = vals[i];
        return prev;
      }, {}
    );
  }

  getrolePermissionData(){
      
    var getURL ="/api/roles/permissions/view/"+sessionStorage.getItem('role_id')
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
//////////////////////////////////////
      var keys =[]
      var values =[]  

////////////////////////////
      
      if(response.body == null){
        this.isUpdateOperation = false;
      }
      else{
        this.isUpdateOperation = true;
      }
     
      var body=JSON.parse((JSON.stringify(response['body'])))
      
      var permissions = JSON.parse(body['detail'])

      console.log(permissions,"check************************************")
      
      
      
      this.componet_list = permissions
    for (var x in this.componet_list){
      keys.push(this.componet_list[x]['component'])
      values.push(this.componet_list[x]['component_id'])
    }
  
    this.component_dict=(this.Arr2object(keys, values))
    this.reverse_componet_list=(this.Arr2object(values,keys))
      
      this.role=permissions[0]['role']
      permissions.forEach((permission:any) => {
        switch(permission.component){
          case 'Administrator':
            this.admin = permission;
            break;
          case 'Customer Support':
            this.client = permission;
            break;
            case 'Finance':
              this.fin = permission;
              break;
              case 'Technical Support':
            this.tech_sup = permission;
            break;
            case 'Reports':
              this.report = permission;
              break;
        }
      });

      if((this.mode=='view')||((this.mode=='edit'))){
          this.pushPermissionFormValues()
        
      } 
   
    })
    
  }

 
  createRoleData(){
    var postURL ="/api/roles/add"
    const headers = {'Authorization' : this.token}
    
    var raw_data= {
      "role":this.roleDetailForm.value['role'],
      "status": this.roleDetailForm.value['status'],
      "description":this.roleDetailForm.value['description']
        }
        this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          console.log(response)
          this.router.navigateByUrl('/administrator/role-onboarding')
        });
  }

  updateRoleData(){
    var putURL ="/api/roles/update/"+sessionStorage.getItem('role_id')
    const headers = {'Authorization' : this.token}
    var raw_data= {

      "role":this.roleDetailForm.value['role'],
      "status":this.roleDetailForm.value['status'],
      "description":this.roleDetailForm.value['description']

     
          }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      this.router.navigateByUrl('/administrator/roles/details/'+this.id+'/view')  
      this.mode='view'
    });
  }

  updatePermissionData(){
    var putURL ="/api/roles/permissions/update/"+sessionStorage.getItem('role_id')
    const headers = {'Authorization' : this.token}
    var raw_data= this._formatData();

    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      this.popupContent ="Data has been updated";
      this.showDialog();
      this.router.navigateByUrl('/administrator/roles/details/'+this.id+'/view')  
      this.mode='view'
    });
  }

  _formatData(){
    var raw_data = <any>[];
    let formData = this.permissionDetailForm.value;    
    let componentMap = <any> {
      admin: 1,
      client: 2,
      tech_sup: 3,
      fin: 4,
      techReport: 5
    };
    let reportsMap = <any>{
      adminReport: 'Administrator Report',
      clientReport: 'Customer Report',
      techReport: 'Technical Report',
      finReport: 'Finance Report',
    }

    Object.keys(formData).forEach((element:any) => {
        if(typeof componentMap[element] !== 'undefined' && element != 'techReport') {
            raw_data.push({
              'role_id': sessionStorage.getItem('role_id'), 
              'component_id': componentMap[element],
              permissions: { permission: [formData[element]]
            }
          })
        }
        if(element == 'techReport'){
          let Reportdata = {
            'role_id': sessionStorage.getItem('role_id'),
            'component_id': componentMap[element],
            permissions: {
              permission: <any>[]
            }
          }

          Object.keys(reportsMap).forEach((el: any) => {
            if(formData[el] == true)
            Reportdata.permissions.permission.push(reportsMap[el])
          });

          raw_data.push(Reportdata);

        }
          
    });
    return raw_data;
  }

  createRolePermissionData(){
    var postURL ="/api/roles/permissions/add"
    const headers = {'Authorization' : this.token}
   
    let raw_data = this._formatData();
    this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          this.popupContent ="Data has been saved";
          this.showDialog();
        });
  }

  onAdd(){
    this.createRoleData()
   }

  onEdit(){
    this.router.navigate(['administrator','roles','details',this.id,'edit'])  
    this.mode='edit'
  }

  onCancle(){
   
    this.router.navigate(['administrator','roles','details',this.id,'view'])
  }

  onCanclePerm(){
    
    window.location.reload();
  }

  onSave(){
    this.updateRoleData()
  }

  onSavePermission(){
    if(this.isUpdateOperation){
      this.updatePermissionData();
      
    }
      
    else{
      this.createRolePermissionData()
      
    }
    
  }
  tabSelect(tab:string){
    this.tab=tab

    if(tab=="Role Details"){
      document.getElementById('custom-tabs-three-home-tab').className='nav-link active'
      document.getElementById('custom-tabs-three-profile-tab').className='nav-link'
    }
    if(tab=="Permissions"){
      document.getElementById('custom-tabs-three-home-tab').className='nav-link'
      document.getElementById('custom-tabs-three-profile-tab').className='nav-link active'
    }

  }

}

