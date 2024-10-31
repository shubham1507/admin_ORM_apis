import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  token:string
  error_message:any;
  associate_id:string
  roles:[]
  activeRoles:[]
  perm: any;
  check:any=["Read"]||["Write"]
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.token=localStorage.getItem('session_token')
    this.associate_id = localStorage.getItem('associate_id')
    console.log(this.associate_id)
    this.getComponentData()
    this.token=localStorage.getItem('session_token')
    this.checkToken()
  }


  getComponentData(){
    var getURL ="/api/components/list/"+this.associate_id
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      
      var detail = JSON.parse(body['detail'])
      this.roles = detail

      console.log( this.roles)
     
      this.activeRoles = detail.filter((role: any)=>{
        return role[0]==='Reports'? role[1].includes('Report'):
        role[1].includes('Read')||role[1].includes('Write')
    
         }
      )
    
    })
  }


 
  checkToken(){
    const getURL ="api/associates/list"
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log('Token Valid')}
      ,(error=>{
        var status_code = error['status']
        this.error_message=""
        switch(status_code)
        {
          case 401:
            this.error_message="Please Login Again"
            sessionStorage.setItem('error_message',this.error_message)
            this.onLogout();
            break;
        }
      }));
  }

  onLogout(){
    localStorage.removeItem('session_token')
    location.reload()
  }

  onRoute(component:string,mode:any){
    const showComp = (mode!=='Read')
    if(component=='Administrator' && showComp){
     
      this.router.navigateByUrl('/administrator')
    }
    if(component=='Customer Support' && showComp){

      this.router.navigateByUrl('/client-dashboard')
      
    }
    if(component=='Technical Support' && showComp){
      
      this.router.navigateByUrl('/tech-support' )
    }

    if(component=='Finance' && showComp){

      // this.router.navigateByUrl('/client-dashboard')
    }
    if(component=='Reports'&& showComp){

      // this.router.navigateByUrl('/client-dashboard')
      
    }

  }


 
  


}
