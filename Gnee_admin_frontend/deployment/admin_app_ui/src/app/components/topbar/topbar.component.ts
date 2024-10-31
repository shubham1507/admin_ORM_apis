import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  token:string
  error_message:any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('session_token')
    this.checkToken()
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


}
