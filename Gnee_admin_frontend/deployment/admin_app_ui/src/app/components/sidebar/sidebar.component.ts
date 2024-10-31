import { Component, Input,OnChanges,OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input() item = '';
  @Output() open = new EventEmitter();

  constructor(private route:ActivatedRoute) { 

  }
  presentlink:any = [];

  links = {
    'home':[
      {
        test:'Dashboard',
        link:'/dashboard'
        
      }
    ],
    'administrator':[
      {
        test:'Associate Management',
        link:'/administrator/associate'
        
      },
      {
        test:'Role Management',
        link:'/administrator/role-onboarding'
      },
      {
        test:'Subscription',
        link:'/administrator/subscription'
      }
    ],
    'associate-onboarding':[
      {
        test:'Associate On-boarding',
        link:'/administrator/associate'
        
      }
    ],
    'role-onboarding':[
      {
        test:'Role On-boarding',
        link:'/administrator/role-onboarding'
        
      }
    ],
    'associate-details':[
      {
        test:'Associate Details',
        link:'/administrator/details'
        
      }
    ],
    'client-dashboard':[
      {
        test:'Client-Management',
        link:'/client-dashboard/management'
        
      }
    ],
    'management':[
      {
        test:'Client-Onbording',
        link:'/client-dashboard/management'
        
      }
      
    ],
    'client-details':[
      {
        test:'Client-details-section',
        link:'/client-dashboard/management'
        
      }
    ],
    'roles-details':[
      {
        test:'Role-details',
        link:'administrator/roles/details/:id/view'
        
      }
    ],
    'role-management':[
      {
        test:'Role-Onbording',
        link:'/administrator/role-onboarding'
        
      }
      
    ],
    'tech-support':[
      {
        test:'Tech Support',
        link:'/tech-support'
        
      }
      
    ],
    'subscription':[
      {
        test:'Product',
        link:'/administrator/subscription/product'
        
      },
      {
        test:'Product Category',
        link:'/administrator/subscription/product-category'
        
      },
      {
        test:'Product Service',
        link:'/administrator/subscription/product-service'
        
      },
      {
        test:'Model',
        link:'/administrator/subscription/model'
        
      },
      {
        test:'Package',
        link:'/administrator/subscription/package'
        
      },
      {
        test:'Subsciptions',
        link:'/administrator/subscription/subscription-package'
      },
      {
        test:'Currency',
        link:'/administrator/subscription/currency'
      }
      
    ],
    'country-onboarding':[
      {
        test:'Country On-boarding',
        link:'/country-onboarding'
        
      }
      
    ],
    'product':[
      {
        test:'Product Category',
        link:'/administrator/subscription/product-category'
        
      },
      {
        test:'Product Service',
        link:'/administrator/subscription/product-service'
        
      }
      
    ],

    'status-onboarding':[
      {
        test:'Status On-boarding',
        link:'/status-onboarding'
        
      }
      
    ],
    
  };


  ngOnInit(): void {

    this.route.url.subscribe(presenturl=>{
      var currenturl:string = presenturl[0]['path']
      if(presenturl.length>1)
      {
        var firsrturl:string = presenturl[1]['path']
      }
      else{
        var firsrturl:string = 'none'
      }if(presenturl.length>2)
      {
        var secondurl:string = presenturl[2]['path']
      }
      else{
        var secondurl:string = 'none'
      }
      console.log('second URL',secondurl)
      // this.presentlink=this.links[currenturl]
       this.presentlink = this.links['home']
       if ((currenturl=='administrator')&&(firsrturl=='none')&&(secondurl=='none')){
        this.presentlink = this.links['administrator']
       }
       if ((currenturl=='tech-support')&&(firsrturl=='none')&&(secondurl=='none')){
        this.presentlink = this.links['tech-support']
       }
       if ((currenturl=='administrator')&&(firsrturl=='associate')&&(secondurl=='none')){
        this.presentlink = this.links['associate-onboarding']
       }
       if ((currenturl=='country-onboarding')&&(firsrturl=='none')&&(secondurl=='none')){
        this.presentlink = this.links['country-onboarding']
       }
       if ((currenturl=='status-onboarding')&&(firsrturl=='none')&&(secondurl=='none')){
        this.presentlink = this.links['status-onboarding']
       }
       if ((currenturl=='administrator')&&(firsrturl=='associate')&&(secondurl=='details')){
        this.presentlink = this.links['associate-details']
       }
       if ((currenturl=='administrator')&&(firsrturl=='roles')&&(secondurl=='details')){
        this.presentlink = this.links['roles-details']
       }
       if ((currenturl=='client-dashboard')&&(firsrturl=='none')){
        this.presentlink = this.links['client-dashboard']
       }
       if ((currenturl=='client-dashboard')&&(firsrturl=='management')){
        this.presentlink = this.links['management']
       }
       if ((currenturl=='client-dashboard')&&(firsrturl=='client-details')){
        this.presentlink = this.links['client-details']
       }
       if ((currenturl=='administrator')&&(firsrturl=='role-onboarding')){
        this.presentlink = this.links['role-management']
       }
       if ((currenturl=='administrator')&&(firsrturl=='subscription')&&(secondurl=='none')){
        this.presentlink = this.links['subscription']
       }
       if ((currenturl=='administrator')&&(firsrturl=='subscription')&&(secondurl=='product')){
        this.presentlink = this.links['subscription']
       }
       if ((currenturl=='administrator')&&(firsrturl=='subscription')&&(secondurl=='product-category')){
        this.presentlink = this.links['subscription']
       }
       if ((currenturl=='administrator')&&(firsrturl=='subscription')&&(secondurl=='product-service')){
        this.presentlink = this.links['subscription']
       }
       if ((currenturl=='administrator')&&(firsrturl=='subscription')&&(secondurl=='package')){
        this.presentlink = this.links['subscription']
       }
       if ((currenturl=='administrator')&&(firsrturl=='subscription')&&(secondurl=='model')){
        this.presentlink = this.links['subscription']
       }
       if ((currenturl=='administrator')&&(firsrturl=='subscription')&&(secondurl=='subscription-package')){
        this.presentlink = this.links['subscription']
       }
       if ((currenturl=='administrator')&&(firsrturl=='subscription')&&(secondurl=='currency')){
        this.presentlink = this.links['subscription']
       }
    })  



  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes.item)
  }

  selectTab(tabName: any) {
    this.open.emit(tabName);
  }


}
