import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IssueService } from '../services/issue.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.css'
})
export class IssuesComponent implements OnInit {
  angForm: FormGroup;
  cust_id: number = 0;
  private custIdSubscription: Subscription;

  constructor(private fb: FormBuilder, private dataService: IssueService, private router: Router, private userService: UserService) {
    this.angForm = this.fb.group({
    issue_type: ['', Validators.required],
    booking_id: [''],
    description: ['', Validators.required],
    });
    this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    this.cust_id = cust_id;});
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.custIdSubscription.unsubscribe();
  }
  
  
  postdata(angForm1: any)
  {
    this.dataService.reportIssue(this.cust_id, angForm1.value.issue_type, angForm1.value.booking_id, angForm1.value.description, "UNADDRESSED")
    .pipe(first())
    .subscribe(
    data => {
    this.router.navigate(['dashboard']);
    },
  
    error => {
      alert("Incorrect Details!");
    });
    }
  
    get issue_type() { return this.angForm.get('issue_type'); }
    get booking_id() { return this.angForm.get('booking_id'); }
    get description() { return this.angForm.get('description'); }
}
