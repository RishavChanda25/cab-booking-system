import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cancel-ride',
  templateUrl: './cancel-ride.component.html',
  styleUrl: './cancel-ride.component.css'
})
export class CancelRideComponent implements OnInit {
  angForm: FormGroup;
  cust_id: number = 0;
  booking_id: number = 0;
  private custIdSubscription: Subscription;

  ride_booked: boolean = true;

  constructor(private fb: FormBuilder, private dataService: BookingService, private router: Router, private userService: UserService) {
    this.angForm = this.fb.group({
    cancel_cause: ['', Validators.required]
    });
    this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    this.cust_id = cust_id;});
    this.booking_id = this.userService.booking_id;
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.custIdSubscription.unsubscribe();
  }
  
  
  postdata(angForm1: any)
  {
    alert("cancelling");
    this.dataService.cancelRide(this.booking_id, angForm1.value.cancel_cause)
    .pipe(first())
    .subscribe(
    data => {
    this.userService.ride_booked = false;
    this.ride_booked = false;
    // this.router.navigate(['dashboard']);
    },
  
    error => {
      alert("Error Cancelling!");
    });

    this.dataService.payForRide(this.booking_id, "", 0.0, "UNPAID")
    .pipe(first())
    .subscribe(
    data => {
    this.router.navigate(['dashboard']);
    },
  
    error => {
      alert("Payment Error!");
    });
    }
    
  
    get cancel_cause() { return this.angForm.get('cancel_cause'); }
}
