import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RideHistoryService } from '../services/ride-history.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrl: './ride-history.component.css'
})
export class RideHistoryComponent implements OnInit {
  cust_id: number = 0;
  angForm: FormGroup;
  ride_history: any[] = [];
  private custIdSubscription: Subscription;

  constructor(private fb: FormBuilder, private dataService: RideHistoryService, private router: Router, private userService: UserService) {
    this.angForm = this.fb.group({
    starting_date: ['', Validators.required],
    end_date: ['', Validators.required]
    });
    this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    this.cust_id = cust_id;});
    // this.cust_id = this.userService.cust_id;
  }

  postdata(angForm1: any)
  {
    alert("fetching");
    this.dataService.getRideHistory(this.cust_id, angForm1.value.starting_date, angForm1.value.end_date)
        .subscribe(
          records => {
            this.ride_history = records;
          },
          error => {
            console.error('Error fetching ride history:', error);
          }
        );
  }

  ngOnInit() { }
}
