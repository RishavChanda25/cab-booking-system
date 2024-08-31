import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  angForm: FormGroup;
  booking_id: number = 0;
  standard_fee: number = 0;
  // private custIdSubscription: Subscription;

  constructor(private fb: FormBuilder, private dataService: BookingService, private router: Router, private userService: UserService) {
    this.angForm = this.fb.group({
    mode: ['', Validators.required],
    });
    // this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    // this.cust_id = cust_id;});
    this.booking_id = this.userService.booking_id;
    this.standard_fee = this.userService.standard_fee;
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    // this.custIdSubscription.unsubscribe();
  }
  
  
  postdata(angForm1: any)
  {
    this.dataService.payForRide(this.booking_id, angForm1.value.mode, this.standard_fee, "PAID")
    .pipe(first())
    .subscribe(
    data => {
    this.router.navigate(['dashboard']);
    },
  
    error => {
      alert("Payment Error!");
    });
    }
  
    get mode() { return this.angForm.get('mode'); }
}
