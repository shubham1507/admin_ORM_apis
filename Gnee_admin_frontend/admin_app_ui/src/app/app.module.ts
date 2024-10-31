import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from 'primeng/table';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService} from "primeng/api";
import {DialogModule} from 'primeng/dialog';

import {TabMenuModule} from 'primeng/tabmenu';



import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AdminComponent } from './components/admin/admin-dashboard/admin.component';
import { AdminOnboardingComponent } from './components/admin/admin-onboarding/admin-onboarding.component';
import { ClientSupportComponent } from './components/client-support/client-onboarding/client-onboarding.component';
import { ClientDashboardComponent } from './components/client-support/client-dashboard/client-dashboard.component';
import { ClientDetailsComponent } from './components/client-support/client-details/client-details.component';
import { AdminDetailsComponent } from './components/admin/admin-details/admin-details.component';
import { ClientUserDetailsComponent } from './components/client-support/client-user-details/client-user-details.component';
import { RoleOnboardingComponent } from './components/role management/role-onboarding/role-onboarding.component';
import { RoleDetailsComponent } from './components/role management/role-details/role-details.component';
import { TechSupportComponent, SafePipe } from './components/tech-support/tech-support.component';
import { CountryOnboardingComponent } from './components/country/country-onboarding/country-onboarding.component';
import { CountryDetailsComponent } from './components/country/country-details/country-details.component';
import { StatusOnboardingComponent } from './components/status/status-onboarding/status-onboarding.component';
import { StatusDetailsComponent } from './components/status/status-details/status-details.component';
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



@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    SigninComponent,
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    AdminComponent,
    AdminOnboardingComponent,
    ClientSupportComponent,
    ClientDashboardComponent,
    ClientDetailsComponent,
    AdminDetailsComponent,
    ClientUserDetailsComponent,
    RoleOnboardingComponent,
    RoleDetailsComponent,
    TechSupportComponent,
    SafePipe,
    CountryOnboardingComponent,
    CountryDetailsComponent,
    StatusOnboardingComponent,
    StatusDetailsComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductServiceComponent,
    ModelComponent,
    PackageComponent,
    SubscriptionComponent,
    ProductDetailsComponent,
    ProductCategoryDetailsComponent,
    ProductServiceDetailsComponent,
    PackageDetailsComponent,
    ModelDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    NgbModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    TabMenuModule,
    DialogModule
  ],
  exports:[SidebarComponent],
  providers: [ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
