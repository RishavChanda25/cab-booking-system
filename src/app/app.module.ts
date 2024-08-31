import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuesComponent } from './issues/issues.component';
import { BookRideComponent } from './book-ride/book-ride.component';
import { CompleteRideComponent } from './complete-ride/complete-ride.component';
import { CancelRideComponent } from './cancel-ride/cancel-ride.component';
import { PaymentComponent } from './payment/payment.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { DriverLoginComponent } from './driver-login/driver-login.component';
import { DriverRegistrationComponent } from './driver-registration/driver-registration.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { DriverGetRideComponent } from './driver-get-ride/driver-get-ride.component';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { RideInProgressComponent } from './ride-in-progress/ride-in-progress.component';
import { DriverRideInProgressComponent } from './driver-ride-in-progress/driver-ride-in-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    IssuesComponent,
    BookRideComponent,
    CompleteRideComponent,
    CancelRideComponent,
    PaymentComponent,
    RideHistoryComponent,
    ManageProfileComponent,
    DriverLoginComponent,
    DriverRegistrationComponent,
    DriverDashboardComponent,
    DriverGetRideComponent,
    NegotiateComponent,
    RideInProgressComponent,
    DriverRideInProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
