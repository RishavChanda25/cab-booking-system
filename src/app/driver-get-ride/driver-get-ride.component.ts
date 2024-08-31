import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-driver-get-ride',
  templateUrl: './driver-get-ride.component.html',
  styleUrl: './driver-get-ride.component.css'
})
export class DriverGetRideComponent implements OnInit {
  // angForm: FormGroup;
  // booking_id: number = 0;
  // standard_fee: number = 0;
  customer_list: any[] = [];
  selectedCustomer: any = null;
  // private custIdSubscription: Subscription;

  

  constructor(
    private fb: FormBuilder,
    private dataService: BookingService,
    private router: Router,
    private userService: UserService
  ) {
    /*this.angForm = this.fb.group({
      customer_fee: ['', [Validators.required, Validators.min(1)]]
    });

    this.booking_id = this.userService.booking_id;
    this.standard_fee = this.userService.standard_fee;*/

    // this.selectLocations();

    this.dataService.fetchCustomers("Y").subscribe(
      records => {
        // Add a random number to each driver
        this.customer_list = records.map((customer: any) => ({ ...customer, pickup: this.selectPickupLocations(), dropoff: this.selectDropoffLocations(), distance: this.generateDistance(), proposed_fee: this.generateProposedFee() }));
      },
      error => {
        console.error('Error fetching available customers:', error);
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
    
    return Math.floor(Math.random() * 1000);
  }

  private generateDistance(): number {
    // Generate a random number (replace with your logic if needed)
    const min = 5;
    const max = 25;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  onRadioChange(customer: any) {
    this.selectedCustomer = customer;
  }

  isSelected(customer: any): boolean {
    return this.selectedCustomer === customer;
  }

  postdata() {
    // Process the selected customers as needed
    // console.log('Selected Customer:', this.selectedCustomer);
    this.userService.booked_cust_id = this.selectedCustomer.cust_id;
    this.router.navigate(['driverdashboard/driverrideinprogress']);
  }

  pickup_locations: string[] = ['Newtown','Behala', 'Salt Lake'];
  dropoff_locations: string[] = ['Rajabazar', 'Santragachi'];
  // pickup: string = '';
  // dropoff: string = '';

  selectPickupLocations(): string {
    const randomPickupIndex = Math.floor(Math.random() * this.pickup_locations.length);
    return this.pickup_locations[randomPickupIndex];
  }

  selectDropoffLocations(): string {
    const randomDropoffIndex = Math.floor(Math.random() * this.dropoff_locations.length);
    return this.dropoff_locations[randomDropoffIndex];
  }

}

/* const driverWithLowestNum = this.driver_list.reduce((minDriver, driver) =>
driver.proposed_fee < minDriver.proposed_fee ? driver : minDriver
);*/
