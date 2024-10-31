

import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup ,Validators,FormControl} from "@angular/forms";

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  tab: string;
  mode: any;
  token: any;
  role: any;
  status: any;
  description:string;
  countryDetailForm: FormGroup;
  id: string;
  country_name: any;
  country_code: any;
  country_continent: any;
  country_language: any;
  country_currency: any;
  country_tax_type: any;

  constructor(    private route : ActivatedRoute,
    private http: HttpClient,
    private fb : FormBuilder,
    private router: Router
    
    ) { }

  ngOnInit(): void {

    this.token=localStorage.getItem('session_token')
    this.mode=this.route.snapshot.params['mode'],
    this.id=this.route.snapshot.params['id']
    sessionStorage.setItem('country_id',this.id)
    switch(this.mode)
    {
      case 'add':
        this.intializeForm()
        break
      case 'edit':
        this.intializeForm()
        this.getCountryData()
        break
      case 'view':
        this.intializeForm()
        this.getCountryData()
        break        
    }


  
  }

  onSubmit(){
    
    console.log(this.countryDetailForm.value);
  }
  intializeForm(){
    this.countryDetailForm=this.fb.group({
      
      country_name:['',Validators.required],
      country_code:['',Validators.required],
      description:['',Validators.required],
      country_continent:['',Validators.required],
      country_language:['',Validators.required],
      country_currency:['',Validators.required],
      country_tax_type:['',Validators.required],
      
    });
  }


pushFormValues(){
    this.countryDetailForm.patchValue({

      country_name:this.country_name,
      country_code:this.country_code,
      description:this.description,
      country_continent:this.country_continent,
      country_language:this.country_language,
      country_currency:this.country_currency,
      country_tax_type:this.country_tax_type
  
  });
}
  getCountryData(){
    var getURL ="/api/country/view/"+sessionStorage.getItem('country_id')
    const headers = {'Authorization' : this.token}
    this.http.get(getURL ,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      var body=JSON.parse((JSON.stringify(response['body'])))
      
      var detail=JSON.parse(body['detail'])
      this.country_name=detail[0]['country_name'],
      this.country_code=detail[0]['country_code'],
      this.description=detail[0]['description'],
      this.country_continent=detail[0]['country_continent'],
      this.country_language=detail[0]['country_language'],
      this.country_currency=detail[0]['country_currency'],
      this.country_tax_type=detail[0]['country_tax_type']
      
      if((this.mode=='view')||((this.mode=='edit'))){
        this.pushFormValues()
      }
    })
  }

 
  createCountryData(){
    var postURL ="/api/country/add"
    const headers = {'Authorization' : this.token}
    
    var raw_data= {
     
      country_name:this.countryDetailForm.value['country_name'],
      country_code:this.countryDetailForm.value['country_code'],
      // description:this.countryDetailForm.value['description'],
      country_continent:this.countryDetailForm.value['country_continent'],
      country_language:this.countryDetailForm.value['country_language'],
      country_currency:this.countryDetailForm.value['country_currency'],
      // country_tax_type:this.countryDetailForm.value['country_tax_type']
      country_tax_type:"tax"
      
        }
      console.log(raw_data)
        this.http.post(postURL,raw_data,{headers,observe: 'response'})
        .subscribe(response => {
          console.log(response)
          this.router.navigateByUrl('/country-onboarding')
        });
  }

  updateCountryData(){
    var putURL ="/api/country/update/"+sessionStorage.getItem('country_id')
    const headers = {'Authorization' : this.token}
    var raw_data= {

      "country_name":this.countryDetailForm.value['country_name'],
      "country_code":this.countryDetailForm.value['country_code'],
      "description":this.countryDetailForm.value['description'],
      "country_continent":this.countryDetailForm.value['country_continent'],
      "country_language":this.countryDetailForm.value['country_language'],
      "country_currency":this.countryDetailForm.value['country_currency'],
      "country_tax_type":this.countryDetailForm.value['country_tax_type']

     
          }
    this.http.put(putURL,raw_data,{headers,observe: 'response'})
    .subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('country-onboarding/detail/'+this.id+'/view')  
      this.mode='view'
    });
  }

  onAdd(){
    this.createCountryData()
   }

  onEdit(){

    this.router.navigateByUrl('country-onboarding/detail/'+this.id+'/edit')  
    this.mode='edit'
  }

  onSave(){
    this.updateCountryData()
  }
 

}
