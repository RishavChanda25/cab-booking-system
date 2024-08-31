import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-driver-ride-in-progress',
  templateUrl: './driver-ride-in-progress.component.html',
  styleUrl: './driver-ride-in-progress.component.css'
})
export class DriverRideInProgressComponent implements OnInit {
  cust_id: number = 0;
  // private custIdSubscription: Subscription;
  driver_id: number = 0;
  booking_id: number = 0;

  ride_booked: boolean = false;

  constructor(private fb: FormBuilder, private dataService: BookingService, private router: Router, private userService: UserService, private datePipe: DatePipe) {
    // this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    // this.cust_id = cust_id;});
    // this.driver_id = this.userService.booked_driver_id;
    this.cust_id = this.userService.booked_cust_id;
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    // this.custIdSubscription.unsubscribe();
  }
  
}
