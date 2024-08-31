import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuesComponent } from './issues/issues.component';
import { BookRideComponent } from './book-ride/book-ride.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { RideInProgressComponent } from './ride-in-progress/ride-in-progress.component';
import { CompleteRideComponent } from './complete-ride/complete-ride.component'
import { CancelRideComponent } from './cancel-ride/cancel-ride.component';
import { PaymentComponent } from './payment/payment.component';
import { DriverLoginComponent } from './driver-login/driver-login.component';
import { DriverRegistrationComponent } from './driver-registration/driver-registration.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { DriverGetRideComponent } from './driver-get-ride/driver-get-ride.component';
import { DriverRideInProgressComponent } from './driver-ride-in-progress/driver-ride-in-progress.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'home', component: HomeComponent },
{ path: 'registration', component: RegisterComponent },
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard]},
{ path: 'dashboard/issues', component: IssuesComponent },
{ path: 'dashboard/bookride', component: BookRideComponent },
{ path: 'dashboard/ridehistory', component: RideHistoryComponent },
{ path: 'dashboard/manageprofile', component: ManageProfileComponent },
{ path: 'dashboard/bookride/negotiate', component: NegotiateComponent },
{ path: 'dashboard/bookride/rideinprogress', component: RideInProgressComponent },
{ path: 'dashboard/bookride/rideinprogress/completeride', component: CompleteRideComponent },
{ path: 'dashboard/bookride/rideinprogress/cancelride', component: CancelRideComponent },
{ path: 'dashboard/bookride/payment', component: PaymentComponent },
{ path: 'driverlogin', component: DriverLoginComponent },
{ path: 'driverregistration', component: DriverRegistrationComponent },
{ path: 'driverdashboard', component: DriverDashboardComponent },
{ path: 'driverdashboard/drivergetride', component: DriverGetRideComponent },
{ path: 'driverdashboard/driverrideinprogress', component: DriverRideInProgressComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' }

]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }