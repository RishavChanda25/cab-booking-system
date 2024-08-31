import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrl: './book-ride.component.css'
})
export class BookRideComponent implements OnInit {
  angForm: FormGroup;
  cust_id: number = 0;
  private custIdSubscription: Subscription;
  driver_id: number = 0;
  booking_id: number = 0;

  ride_booked: boolean = false;

  constructor(private fb: FormBuilder, private dataService: BookingService, private router: Router, private userService: UserService, private datePipe: DatePipe) {
    this.angForm = this.fb.group({
    pickup: ['', Validators.required],
    dropoff: ['', Validators.required],
    ride_type: ['', Validators.required]
    });
    this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    this.cust_id = cust_id;});
    this.driver_id = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.custIdSubscription.unsubscribe();
  }
  
  
  postdata(angForm1: any)
  {
    alert("submitting");
    const date = new Date();
    const booking_date = this.datePipe.transform(date, "yyyy-MM-dd") as string;
    this.dataService.bookRide(this.cust_id, this.driver_id, angForm1.value.pickup, angForm1.value.dropoff, angForm1.value.ride_type, 0, "", "ONGOING", "", booking_date)
    .pipe(first())
    .subscribe(
    data => {
    this.booking_id = +data.booking_id;
    alert(this.booking_id);
    this.userService.setBookingId(this.booking_id);
    this.ride_booked = this.userService.ride_booked;
    this.router.navigate(['dashboard/bookride/negotiate']);
    },
  
    error => {
      alert("Incorrect Details!");
    });
    }
  
    get pickup() { return this.angForm.get('pickup'); }
    get dropoff() { return this.angForm.get('dropoff'); }
    get ride_type() { return this.angForm.get('ride_type'); }
    
}
