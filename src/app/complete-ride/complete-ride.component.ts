import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-complete-ride',
  templateUrl: './complete-ride.component.html',
  styleUrl: './complete-ride.component.css'
})
export class CompleteRideComponent implements OnInit {
  angForm: FormGroup;
  cust_id: number = 0;
  booking_id: number = 0;
  driver_id: number = 0;
  private custIdSubscription: Subscription;

  ride_booked: boolean = true;

  constructor(private fb: FormBuilder, private dataService: BookingService, private router: Router, private userService: UserService) {
    this.angForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      feedback: ['']
    });
    this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    this.cust_id = cust_id;});
    this.booking_id = this.userService.booking_id;
    this.driver_id = this.userService.booked_driver_id;
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.custIdSubscription.unsubscribe();
  }
  
  
  postdata(angForm1: any)
  {
    alert("completing");
    this.dataService.completeRide(this.booking_id, this.driver_id, angForm1.value.rating, angForm1.value.feedback)
    .pipe(first())
    .subscribe(
    data => {
    this.userService.ride_booked = false;
    this.ride_booked = false;
    this.router.navigate(['dashboard/bookride/payment']);
    },
  
    error => {
      alert("Error Completing!");
    });
    }
  
    get rating() { return this.angForm.get('rating'); }
    get feedback() { return this.angForm.get('feedback'); }
}
