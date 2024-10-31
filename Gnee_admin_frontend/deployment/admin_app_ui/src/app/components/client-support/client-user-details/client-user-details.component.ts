
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from "@angular/core";
@Component({
  selector: 'app-client-user-details',
  templateUrl: './client-user-details.component.html',
  styleUrls: ['./client-user-details.component.css']
})
export class ClientUserDetailsComponent implements OnInit {
  isContent:boolean;

  users: any;
  currentIndex = -1;
  client_user_name = '';

  dropdown_disable: boolean = true

  tab: string
  token: string
  id: string
  mode: string
  clientdetailForm: FormGroup
  clientuserdetailForm: FormGroup



  client_name: string
  client_status: boolean
  client_website: string
  registered_in_country: string
  registration_id: string
  default_currency_used: string
  VAT_number: string
  VAT_used: string
  is_active: string
  status: string


  address_line_1: string
  address_line_2: string
  address_line_3: string

  postcode: string
  county: string
  country: string

  client_comms_name: string
  client_comms_email: string
  client_comms_contact_number: any

  client_techSupp_name: string
  client_techSupp_email: string
  client_techSupp_contact_number: string

  client_finance_name: string
  client_finance_email: string
  client_finance_contact_number: string
  client_finance_contact_name: string




  contract_signed_by: string

  country_dict: any
  country_list: any





  first_name: string
  last_name: string
  contact_number: string
  secondry_contact: string
  login_id: string
  email: any;
  personal_email: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.retrieveClientUserList();
    this.token = localStorage.getItem('session_token')
    this.id = this.route.snapshot.params['id']

    this.mode = this.route.snapshot.params['mode']
    // sessionStorage.setItem('client_id',this.id)
    sessionStorage.setItem('client_user_id', this.id)

    this.tab = "Client Users"
    this.intializeForm();

    this.getCountryData();
    // this.getClientData();
    this.getClientUserData();

    switch (this.mode) {
      case 'add':
        console.log('add')
        this.intializeForm()
        this.getCountryData()
        break
      case 'edit':
        console.log('edit')
        this.intializeForm()
        this.getClientData()

        this.getCountryData()
        break
      case 'view':
        console.log('view')
        this.intializeForm()
        this.getClientData()

        this.getClientUserData()
        this.getCountryData()
        break
    }

  }
  getClientData() {
    var getURL = "/api/client/view/" + sessionStorage.getItem('client_id')
    const headers = { 'Authorization': this.token }
    this.http.get(getURL, { headers, observe: 'response' })
      .subscribe(response => {
        var body: any = response['body']
        var detail = body['detail']

        var body = JSON.parse((JSON.stringify(response['body'])))

        var detail = JSON.parse(body['detail'])


        detail = detail.map((_element: any) => {

          _element = JSON.stringify(_element).split(" ").join("");
          _element = JSON.parse(_element)
          return _element
        })

        this.client_name = detail[0]['client_name']
        this.client_techSupp_contact_number = detail[0]['"client_techSupp_contact_number"'] + " ".trim()
        this.client_techSupp_email = detail[0]['"client_techSupp_email"'] + " ".trim()
        this.address_line_1 = detail[0]['address_line_1']
        this.address_line_2 = detail[0]['address_line_2']
        this.address_line_3 = detail[0]['address_line_3']
        this.postcode = detail[0]['postcode']
        this.county = detail[0]['county']
        this.country = detail[0]['country']
        this.client_comms_contact_number = detail[0]['client_comms_contact_number']
        this.client_techSupp_name = detail[0]['"client_techSupp_name"']
        this.VAT_number = detail[0]['"VAT_number"']
        this.VAT_used = detail[0]['"VAT_used"']
        this.client_finance_contact_name = detail[0]["client_finance_contact_name"]
        this.client_finance_email = detail[0]['client_finance_email']
        if (detail[0]['client_finance_contact_number'] == null) {
          this.client_finance_contact_number = 'None'
        }
        else {

          this.client_finance_contact_number = detail[0]['client_finance_contact_number']


        }
        this.is_active = detail[0]['is_active']
        this.contract_signed_by = detail[0]['contract_signed_by']
        this.registered_in_country = detail[0]['registered_in_country']
        this.registration_id = detail[0]['registration_id']
        this.default_currency_used = detail[0]['default_currency_used']
        this.client_website = detail[0]['client_website']
        this.client_comms_email = detail[0]['client_comms_email']


        console.log(this.client_name)
        this.pushFormValues(response.body)
        if ((this.mode == 'view') || ((this.mode == 'edit'))) {
          this.pushFormValues(response.body)
        }

      })
  }


  getClientUserData() {
    var getURL = "/api/client/users/view/" + sessionStorage.getItem('client_id') + "/" + sessionStorage.getItem('client_user_id')
    const headers = { 'Authorization': this.token }
    this.http.get(getURL, { headers, observe: 'response' })
      .subscribe(response => {

       

        var body = JSON.parse((JSON.stringify(response['body'])))

        var detail = JSON.parse(body['detail'])





        this.first_name = detail[0]['first_name']
        this.last_name = detail[0]['last_name']

        this.address_line_1 = detail[0]['address_line_1']
        this.address_line_2 = detail[0]['address_line_2']
        this.address_line_3 = detail[0]['address_line_3']

        this.postcode = detail[0]['postcode']
        this.county = detail[0]['county']
        this.country = detail[0]['country']

        this.contact_number = detail[0]['contact_number']
        this.secondry_contact = detail[0]['secondry_contact']
        this.email = detail[0]['email']
        this.personal_email = detail[0]['personal_email']
        this.login_id = detail[0]['login_id']

        if ((this.mode == 'view') || ((this.mode == 'edit'))) {
          this.pushFormValuesUser(response.body)
        }

      })
    
  }
  updateClientData() {

    var putURL = "/api/client/update/" + sessionStorage.getItem('client_id')
    const headers = { 'Authorization': this.token }
    var raw_data = {

      "client_name": this.clientdetailForm.value['client_name'],
      "client_techSupp_contact_number": this.clientdetailForm.value['"client_techSupp_contact_number"'],
      "client_techSupp_email": this.clientdetailForm.value['"client_techSupp_email"'],
      "address_line_1": this.clientdetailForm.value['address_line_1'],
      "address_line_2": this.clientdetailForm.value['address_line_2'],
      "address_line_3": this.clientdetailForm.value['address_line_3'],
      "postcode": this.clientdetailForm.value['postcode'],
      "county": this.clientdetailForm.value['county'],
      "country": this.clientdetailForm.value['country'],
      "client_comms_contact_number": this.clientdetailForm.value['client_comms_contact_number'],
      "client_techSupp_name": this.clientdetailForm.value['"client_techSupp_name"'],
      "VAT_number": this.clientdetailForm.value['"VAT_number"'],
      "VAT_used": this.clientdetailForm.value['"VAT_used"'],
      "client_finance_contact_name": this.clientdetailForm.value["client_finance_contact_name"],
      "client_finance_email": this.clientdetailForm.value['client_finance_email'],
      "client_finance_contact_number": this.clientdetailForm.value['client_finance_contact_number'],
      "is_active": this.clientdetailForm.value['is_active'],
      "registered_in_country": this.clientdetailForm.value['registered_in_country'],
      "registration_id": this.clientdetailForm.value['registration_id'],
      "default_currency_used": this.clientdetailForm.value['default_currency_used'],
      "client_website": this.clientdetailForm.value['client_website'],
      "client_comms_email": this.clientdetailForm.value['client_comms_email']

    }
    this.http.put(putURL, raw_data, { headers, observe: 'response' })
      .subscribe(response => {
        console.log(response)
        this.router.navigateByUrl('/client-dashboard/detail/' + this.id + '/view')
        this.mode = 'view'
      });
  }


  updateUserClientData() {

    var putURL = "/api/client/users/update/" + sessionStorage.getItem('client_id') + "/" + sessionStorage.getItem('client_user_id')

    const headers = { 'Authorization': this.token }
    var raw_data = {
      ...this.clientuserdetailForm.value,

      "client_user_role_id":2,


    }

    this.http.put(putURL, raw_data, { headers, observe: 'response' })
      .subscribe(response => {
        console.log(response)
        this.router.navigateByUrl('/client-dashboard/detail/' + this.id + '/view')
        this.mode = 'view'
      });
  }

  createClientData() {
    var postURL = "/api/client/add"
    const headers = { 'Authorization': this.token }
    var raw_data = {
      "client_name": this.clientdetailForm.value['client_name'],
      "client_techSupp_contact_number": this.clientdetailForm.value['"client_techSupp_contact_number"'],
      "client_techSupp_email": this.clientdetailForm.value['"client_techSupp_email"'],
      "address_line_1": this.clientdetailForm.value['address_line_1'],
      "address_line_2": this.clientdetailForm.value['address_line_2'],
      "address_line_3": this.clientdetailForm.value['address_line_3'],
      "postcode": this.clientdetailForm.value['postcode'],
      "county": this.clientdetailForm.value['county'],
      "country": this.clientdetailForm.value['country'],
      "client_comms_contact_number": this.clientdetailForm.value['client_comms_contact_number'],
      "client_techSupp_name": this.clientdetailForm.value['"client_techSupp_name"'],
      "VAT_number": this.clientdetailForm.value['"VAT_number"'],
      "VAT_used": this.clientdetailForm.value['"VAT_used"'],
      "client_finance_contact_name": this.clientdetailForm.value["client_finance_contact_name"],
      "client_finance_email": this.clientdetailForm.value['client_finance_email'],
      "client_finance_contact_number": this.clientdetailForm.value['client_finance_contact_number'],
      "is_active": this.clientdetailForm.value['is_active'],
      "registered_in_country": this.clientdetailForm.value['registered_in_country'],
      "registration_id": this.clientdetailForm.value['registration_id'],
      "default_currency_used": this.clientdetailForm.value['default_currency_used'],
      "client_website": this.clientdetailForm.value['client_website'],
      "client_comms_email": this.clientdetailForm.value['client_comms_email']
    }
    this.http.post(postURL, raw_data, { headers, observe: 'response' })
      .subscribe(response => {
        console.log(response, "created client")
        this.router.navigateByUrl('client-dashboard/management')
      });
  }

  Arr2object(keys: any, vals: any) {
    return keys.reduce(
      function (prev: any, val: any, i: any) {
        prev[val] = vals[i];
        return prev;
      }, {}
    );
  }



  createClientUserData() {
    var postURL = "/api/client/users/add"
    // MANDATORY_COLUMNS_ADDNEW = ['client_id', 'client_user_role_id', 'first_name', 'country', 'postcode', 'address_line_1', 'contact_number', 'email', 'login_id', 'password', 'status'] 

    var raw_data = {
     
      ...this.clientuserdetailForm.value,
      "country": 2,
      "status":1,      
      "client_id": this.id,
      "password": "1234",
      "client_user_role_id": 2,
    }
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)

    };
    // const headers = {'Authorization' : this.token}
    this.http.post(postURL, raw_data, options)
      .subscribe(response => {
        console.log(response, "created client")
        this.router.navigateByUrl('client-dashboard/management')
      });
  }

  getCountryData() {
    var getURL = "/api/country/list"
    const headers = { 'Authorization': this.token }
    this.http.get(getURL, { headers, observe: 'response' })
      .subscribe(response => {
        console.log('country', response)
        var body = JSON.parse((JSON.stringify(response['body'])))
        var detail = JSON.parse(body['detail'])
        this.country_list = detail
        console.log(this.country_list)
        var keys = []
        var values = []
        for (var x in this.country_list) {
          keys.push(this.country_list[x]['country_name'])
          values.push(this.country_list[x]['country_id'])
        }
        this.country_dict = (this.Arr2object(keys, values))
      });
  }


  intializeForm() {
    this.clientdetailForm = this.fb.group({
      client_name: ['', [Validators.required]],
      client_techSupp_contact_number: ['',],
      client_website: ['',],
      registered_in_country: ['',],
      registration_id: [''],
      VAT_number: [''],
      VAT_used: [''],

      address_line_1: ['',],
      address_line_2: ['',],
      address_line_3: ['',],

      postcode: ['',],
      county: ['',],
      country: ['',],

      client_comms_contact_number: ['',],
      client_comms_email: ['',],
      client_finance_email: ['',],
      client_techSupp_email: ['',],
      client_techSupp_name: [''],
      client_finance_contact_name: [''],
      client_finance_contact_number: [''],
      default_currency_used: [''],
      contract_signed_by: [''],
      is_active: ['']


    });
    this.clientuserdetailForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      address_line_1: ['', [Validators.required]],
      address_line_2: ['',],
      address_line_3: ['',],
      status: ['',],
      postcode: ['',],
      county: ['',],
      country: ['',],

      contact_number: ['',],
      secondry_contact: ['',],
      email: ['',],
      personal_email: ['',],
      login_id: ['',]




    });
  }


  onSubmit() {
    console.log(this.clientdetailForm.value);
  }

  pushFormValues(response: any) {

    if (this.tab == 'Client Details') {
      this.clientdetailForm.patchValue({
        // ...response['detail'][0]

        client_name: this.client_name,
        client_techSupp_contact_number: this.client_techSupp_contact_number,
        address_line_1: this.address_line_1,
        address_line_2: this.address_line_2,
        address_line_3: this.address_line_3,
        postcode: this.postcode,
        county: this.county,
        country: this.country,
        client_comms_contact_number: this.client_comms_contact_number,
        client_techSupp_name: this.client_techSupp_name,
        VAT_number: this.VAT_number,
        VAT_used: this.VAT_used,
        client_website: this.client_website,
        client_finance_contact_name: this.client_finance_contact_name,
        client_finance_email: this.client_finance_email,
        client_finance_contact_number: this.client_finance_contact_number,
        contract_signed_by: this.contract_signed_by,
        is_active: this.is_active,
        registered_in_country: this.registered_in_country,
        registration_id: this.registration_id,
        default_currency_used: this.default_currency_used,
        client_techSupp_email: this.client_techSupp_email,
        client_comms_email: this.client_comms_email


      });
    }

    if (this.tab == 'Client Users') {
      console.log(this.first_name)
      this.clientuserdetailForm.patchValue({


        first_name: this.first_name,
        last_name: this.last_name,

        address_line_1: this.address_line_1,
        address_line_2: this.address_line_2,
        address_line_3: this.address_line_3,

        postcode: this.postcode,
        county: this.county,
        country: this.country,
        contact_number: this.contact_number,
        secondry_contact: this.secondry_contact,
        email: this.email,
        personal_email: this.personal_email,
        login_id: this.login_id
      });
    }
  }

  pushFormValuesUser(response: any) {
    console.log(response, "patchValue")

    this.clientuserdetailForm.patchValue({

      first_name: this.first_name,
      last_name: this.last_name,

      address_line_1: this.address_line_1,
      address_line_2: this.address_line_2,
      address_line_3: this.address_line_3,

      postcode: this.postcode,
      county: this.county,
      country: this.country,
      contact_number: this.contact_number,
      secondry_contact: this.secondry_contact,
      email: this.email,
      personal_email: this.personal_email,
      login_id: this.login_id

    });
    console.log(this.clientdetailForm.value['client_name'])
  }



  onEdit() {
    this.router.navigateByUrl('client-dashboard/detail/' + this.id + '/edit')
    this.mode = 'edit'
  }

  onUserEdit() {
    this.router.navigateByUrl('client-dashboard/detail/' + this.id + '/edit/client-user-detail')
    this.mode = 'edit'
  }



  onSave() {
    this.updateClientData()
  }

  onUserSave() {
    this.updateUserClientData()
    console.log("called")
  }

  onAdd() {
    this.createClientData()
  }

  onClientUserAdd() {
    this.createClientUserData()
  }
  tabSelect(tab: string) {
    this.tab = tab
    if (this.tab == 'Client Details') {
      this.getClientData();
    }
    else if (this.tab == 'Client Users') {
      this.getClientUserData();
    }

  }

}



