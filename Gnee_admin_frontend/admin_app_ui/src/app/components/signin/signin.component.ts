import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  error_message:any
  isLoggedIn:any
  
  
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private _authService :AuthService,
    private http: HttpClient,
  ) {
    this.signinForm = this.fb.group({
      user: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.isLoggedIn=true
    if  (this._authService.loggedIn()){
      this.router.navigate(['dashboard']);
    }
   }


  get user() {
    return this.signinForm.get('user');
  }

  onLogin(){
    var username=this.signinForm.value['user']
    var password=this.signinForm.value['password']
    var raw_data= {
                    "user":username,
                    "password":password
                  }
    const postURL ="/api/associates/login"
    
    this.http.post(postURL ,raw_data,{observe: 'response'})
    .subscribe(response => {
      console.log(response)
      this.isLoggedIn=true
      var body=JSON.parse((JSON.stringify(response['body'])))
      var session_token = body['session_token']
      var associate_id = body['associate_id']
      console.log(associate_id)
      localStorage.setItem('associate_id',associate_id)
      localStorage.setItem('session_token',session_token)
      this.router.navigate(['dashboard'])
    },
    (error=>{
      this.isLoggedIn=false
      var status_code = error['status']
      this.error_message=""
      switch(status_code)
      {
        case 401:
          this.error_message="Invalid Username or Password"
          break;
        
          case 504:
          this.error_message="Bad Gateway"
          break;
      }
    }));
  }


}



