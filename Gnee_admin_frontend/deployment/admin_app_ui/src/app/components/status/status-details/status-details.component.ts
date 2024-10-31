
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup ,Validators} from "@angular/forms";

@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.css']
})
export class StatusDetailsComponent implements OnInit {
  mode: any;
  token: any;
  role: any;
  status: any;
  statusDetailForm: FormGroup;
  id: string;
  dropdown_disable: boolean = true
  status_id: any;

  constructor(    private route : ActivatedRoute,
    private http: HttpClient,
    private fb : FormBuilder,
    private router: Router
    
    ) { }

  ngOnInit(): void {

    this.token=localStorage.getItem('session_token')
    this.mode=this.route.snapshot.params['mode'],
    this.id=this.route.snapshot.params['id']
    sessionStorage.setItem('status_id',this.id)


    switch(this.mode)
    {
      case 'add':
        this.intializeForm()
        break
      case 'edit':
        this.intializeForm()
        this.getstatusData()
        break
      case 'view':
        this.intializeForm()
        this.getstatusData()
        break        
    }


  
  }

  onSubmit(){
    
    console.log(this.statusDetailForm.value);
  }
  intializeForm(){
    this.statusDetailForm=this.fb.group({
      
      status:['',Validators.required],
      
    });
  }


pushFormValues(){
    this.statusDetailForm.patchValue({

      status:this.status,
  
  });
  console.log(this.status)
}
  getstatusData(){
    var getURL ="/api/status/view/"+sessionStorage.getItem('status_id')
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      
      var detail=JSON.parse(body['detail'])
      
      this.status_id=detail[0]['status_id']
      this.status=detail[0]['status']
      

      
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushFormValues()
      }
    })
  }

 
  createStatusData(){
    var postURL ="/api/status/add"
    const headers = {'Authorization' : this.token}
    
    var raw_data= {
      "status":this.statusDetailForm.value['status'],
      
        }
      console.log(raw_data)
        this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          console.log(response)
          this.router.navigateByUrl('/status-onboarding')
        });
  }

  updateStatusData(){
    var putURL ="/api/status/update/"+sessionStorage.getItem('status_id')
    const headers = {'Authorization' : this.token}
    var raw_data= {

      "status":this.statusDetailForm.value['status'],

     
          }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('status-onboarding/details/'+this.id+'/view')  
      this.mode='view'
    });
  }

  onAdd(){
    this.createStatusData()
   }

  onEdit(){
    this.router.navigateByUrl('status-onboarding/details/'+this.id+'/edit')  
    this.mode='edit'
  }

  onSave(){
    this.updateStatusData()
  }

 

}
