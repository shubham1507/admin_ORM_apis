import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AdminComponent } from './components/admin/admin-dashboard/admin.component';
import { AdminOnboardingComponent } from './components/admin/admin-onboarding/admin-onboarding.component';
import { AdminDetailsComponent } from './components/admin/admin-details/admin-details.component'; 
import { ClientSupportComponent } from "./components/client-support/client-onboarding/client-onboarding.component";
import { ClientDashboardComponent } from "./components/client-support/client-dashboard/client-dashboard.component";
import { ClientDetailsComponent } from "./components/client-support/client-details/client-details.component";
import { ClientUserDetailsComponent } from "./components/client-support/client-user-details/client-user-details.component";
import { RoleOnboardingComponent } from "./components/role management/role-onboarding/role-onboarding.component";
import { RoleDetailsComponent } from "./components/role management/role-details/role-details.component";
import { TechSupportComponent } from "./components/tech-support/tech-support.component";
import { CountryOnboardingComponent } from "./components/country/country-onboarding/country-onboarding.component";
import { CountryDetailsComponent } from "./components/country/country-details/country-details.component";
import { StatusOnboardingComponent } from "./components/status/status-onboarding/status-onboarding.component";
import { StatusDetailsComponent } from "./components/status/status-details/status-details.component";
import { ProductComponent } from './components/subscription/product/product.component';
import { ProductCategoryComponent } from './components/subscription/product-category/product-category.component';
import { ProductServiceComponent } from './components/subscription/product-service/product-service.component';
import { ModelComponent } from './components/subscription/model/model.component';
import { PackageComponent } from './components/subscription/package/package.component';
import { SubscriptionComponent } from './components/subscription/subscription/subscription.component';
import { ProductDetailsComponent } from './components/subscription/product-details/product-details.component';
import { ProductCategoryDetailsComponent } from './components/subscription/product-category-details/product-category-details.component';
import { ProductServiceDetailsComponent } from './components/subscription/product-service-details/product-service-details.component';
import { PackageDetailsComponent } from './components/subscription/package-details/package-details.component';
import { ModelDetailsComponent } from './components/subscription/model-details/model-details.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', component: SigninComponent},
  { path: 'login', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  { path: 'administrator', component: AdminComponent,canActivate:[AuthGuard]},
  { path: 'tech-support', component: TechSupportComponent,canActivate:[AuthGuard]},
  { path: 'status-onboarding', component: StatusOnboardingComponent,canActivate:[AuthGuard]},
  { path: 'status-onboarding/details/:id/:mode', component: StatusDetailsComponent,canActivate:[AuthGuard]},
  { path: 'status-onboarding/details/:mode', component: StatusDetailsComponent,canActivate:[AuthGuard]},
  { path: 'country-onboarding', component: CountryOnboardingComponent,canActivate:[AuthGuard]},
  { path: 'country-onboarding/detail/:id/:mode', component: CountryDetailsComponent,canActivate:[AuthGuard]},
  { path: 'country-onboarding/detail/:mode', component: CountryDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/role-onboarding', component: RoleOnboardingComponent,canActivate:[AuthGuard]},
  { path: 'administrator/roles/details/:id/:mode', component: RoleDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/roles/details/:mode', component: RoleDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/associate', component: AdminOnboardingComponent,canActivate:[AuthGuard]},
  { path: 'administrator/associate/details/:id/:mode', component: AdminDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/associate/details/:mode', component: AdminDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product', component: ProductComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product-category', component: ProductCategoryComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product-service', component: ProductServiceComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/model', component: ModelComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/package', component: PackageComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription', component: SubscriptionComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product/details/:id/:mode', component: ProductDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product/details/:mode', component: ProductDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product-category/details/:id/:mode', component: ProductCategoryDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product-category/details/:mode', component: ProductCategoryDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product-service/details/:id/:mode', component: ProductServiceDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/product-service/details/:mode', component: ProductServiceDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/package/details/:id/:mode', component: PackageDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/package/details/:mode', component: PackageDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/model/details/:id/:mode', component: ModelDetailsComponent,canActivate:[AuthGuard]},
  { path: 'administrator/subscription/model/details/:mode', component: ModelDetailsComponent  ,canActivate:[AuthGuard]},
  { path: 'client-dashboard', component: ClientDashboardComponent,canActivate:[AuthGuard]},
  { path: 'client-dashboard/management', component: ClientSupportComponent,canActivate:[AuthGuard]},
  { path: 'client-dashboard/detail/:id/:mode', component: ClientDetailsComponent,canActivate:[AuthGuard]},
  { path: 'client-dashboard/detail/:mode', component: ClientDetailsComponent,canActivate:[AuthGuard]},
  { path: 'client-dashboard/detail/:id/:mode/client-user-detail', component: ClientUserDetailsComponent,canActivate:[AuthGuard]},  
];

@NgModule({
  imports: [TabsModule.forRoot(),RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
