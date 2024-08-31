import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ManageProfileService } from '../services/manage-profile.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.css'
})
export class ManageProfileComponent implements OnInit {
  cust_id: number = 0;
  angForm: FormGroup;
  customers: any[] = [];
  private custIdSubscription: Subscription;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private dataService: ManageProfileService, private router: Router, private userService: UserService) {
    this.angForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      acc_no: [''],
      password: ['']
      });
    this.custIdSubscription = this.userService.cust_id$.subscribe(cust_id => {
    this.cust_id = cust_id;});
    this.dataService.getProfile(this.cust_id).subscribe((response) => {
      const customer = response.customer;
      this.angForm.patchValue(customer);
    });
    // this.cust_id = this.userService.cust_id;
  }

  postdata(angForm1: any)
{
  this.dataService.updateDetails(this.cust_id, angForm1.value.name, angForm1.value.email, angForm1.value.phone, angForm1.value.password, angForm1.value.address, angForm1.value.acc_no)
  .pipe(first())
  .subscribe(
  data => {
  this.router.navigate(['dashboard']);
  },

  error => {
    alert("Incorrect Details!");
  });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit() { }

  get name() { return this.angForm.get('name'); }
  get email() { return this.angForm.get('email'); }
  get phone() { return this.angForm.get('phone'); }
  get password() { return this.angForm.get('password'); }
  get address() { return this.angForm.get('address'); }
  get acc_no() { return this.angForm.get('acc_no'); }
}
