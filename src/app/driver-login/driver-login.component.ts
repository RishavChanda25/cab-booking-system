import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-driver-login',
  templateUrl: './driver-login.component.html',
  styleUrl: './driver-login.component.css'
})
export class DriverLoginComponent implements OnInit {
  angForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private dataService: ApiService, private userService: UserService, private router: Router) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  postdata(angForm1: any) {
    this.dataService.driverLogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            const driver_id = +data.driver_id;
            this.userService.setDriverId(driver_id);
            const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/driverdashboard'; // driverdashboard
            this.router.navigate([redirect]);
          } else {
            alert("Email Or Password Is Incorrect");
          }
        },
        error => {
          alert("Email Or Password Is Incorrect");
        }
      );
  }

  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }

  /* onSubmit() {
    console.log('Form submitted!');
  } */

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}