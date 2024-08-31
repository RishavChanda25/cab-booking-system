import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-negotiate',
  templateUrl: './negotiate.component.html',
  styleUrl: './negotiate.component.css'
})
export class NegotiateComponent implements OnInit {
  angForm: FormGroup;
  booking_id: number = 0;
  standard_fee: number = 0;
  driver_list: any[] = [];
  // private custIdSubscription: Subscription;

  /*constructor(private fb: FormBuilder, private dataService: BookingService, private router: Router, private userService: UserService) {
    this.angForm = this.fb.group({
      customer_fee: ['', [Validators.required, Validators.min(1)]]
    });
    // this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    // this.cust_id = cust_id;});
    this.booking_id = this.userService.booking_id;
    this.standard_fee = this.userService.standard_fee;
    this.dataService.fetchDrivers("Y")
        .subscribe(
          records => {
            this.driver_list = records;
          },
          error => {
            console.error('Error fetching available drivers:', error);
          }
        );
  }*/

  constructor(
    private fb: FormBuilder,
    private dataService: BookingService,
    private router: Router,
    private userService: UserService
  ) {
    this.angForm = this.fb.group({
      customer_fee: ['', [Validators.required, Validators.min(1)]]
    });

    this.booking_id = this.userService.booking_id;
    this.standard_fee = this.userService.standard_fee;

    this.dataService.fetchDrivers("Y").subscribe(
      records => {
        // Add a random number to each driver
        this.driver_list = records.map((driver: any) => ({ ...driver, proposed_fee: this.generateProposedFee() }));
      },
      error => {
        console.error('Error fetching available drivers:', error);
      }
    );
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    // this.custIdSubscription.unsubscribe();
  }

  private generateProposedFee(): number {
    // Generate a random number (replace with your logic if needed)
    const min = this.standard_fee;
    const max = this.standard_fee * 1.3;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  postdata(angForm1: any)
  {
    const customer_fee = angForm1.value.customer_fee;
    const driverWithLowestFee = this.driver_list.reduce((minDriver, driver) =>
      driver.proposed_fee < minDriver.proposed_fee ? driver : minDriver);
    const lowestProposedFee = driverWithLowestFee.proposed_fee;
    if (lowestProposedFee <= customer_fee || lowestProposedFee - customer_fee < 0.05 * lowestProposedFee)
    {
      this.userService.booked_driver_id = driverWithLowestFee.driver_id;
      this.userService.standard_fee = Math.min(lowestProposedFee, customer_fee);
      alert("Ride Found");
      this.router.navigate(['dashboard/bookride/rideinprogress']);
    }
    else
      alert("No Drivers Will Go At That Price");
    }
  
    get mode() { return this.angForm.get('mode'); }
}

/* const driverWithLowestNum = this.driver_list.reduce((minDriver, driver) =>
driver.proposed_fee < minDriver.proposed_fee ? driver : minDriver
);*/
