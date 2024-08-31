import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrl: './driver-registration.component.css'
})
export class DriverRegistrationComponent implements OnInit {
  angForm: FormGroup;
  passwordVisible: boolean = false;
  
  constructor(private fb: FormBuilder, private dataService: ApiService, private router:Router) {
    this.angForm = this.fb.group({
    d_name: ['', Validators.required],
    email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    license_no: ['', Validators.required]
    });
  }
  
  ngOnInit() {
  }
  
  postdata(angForm1: any)
  {
    this.dataService.driverRegistration(angForm1.value.d_name, angForm1.value.phone, angForm1.value.license_no, "Y", angForm1.value.password, angForm1.value.email)
    .pipe(first())
    .subscribe(
    data => {
    this.router.navigate(['driverlogin']);  // d_name: string, phone: string,  license_no: string, available: string, password: string, email: string)
    },
  
    error => {
      alert("Incorrect Details!");
    });
    }
  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  
    /*get name() { return this.angForm.get('name'); }
    get email() { return this.angForm.get('email'); }
    get phone() { return this.angForm.get('phone'); }
    get password() { return this.angForm.get('password'); }
    get address() { return this.angForm.get('address'); }
    get acc_no() { return this.angForm.get('acc_no'); }*/
  }