import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Customers } from '../models/customers';

@Injectable({
providedIn: 'root'
})

export class ApiService {
  redirectUrl: string | undefined;
  baseUrl:string = "http://localhost/cab-booking-system/php";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient : HttpClient) { }

  public customerLogin(email: string, password: string) {
    alert(email);

    return this.httpClient.post<any>(this.baseUrl + '/login.php', { email, password })
      .pipe(map(response => {
        const customers = response.customers;
        const cust_id = response.cust_id;

        if (customers.length > 0) {
          const loggedInUser = customers[0];

          this.setToken(loggedInUser.name);
          this.getLoggedInName.emit(true);

          console.log('Logged-in Customer ID:', cust_id);

          return { user: loggedInUser, cust_id };
        } else {
          
          return null;
        }
      }));
}

public customerRegistration(name: string, email: string, phone: string, password: string, address: string, acc_no: string) {
    return this.httpClient.post<any>(this.baseUrl + '/register.php', { name, email, phone, password, address, acc_no })
    .pipe(map(Customers => {
    return Customers;
    }));
  }

  public driverLogin(email: string, password: string) {
    alert(email);

    return this.httpClient.post<any>(this.baseUrl + '/driver_login.php', { email, password })
      .pipe(map(response => {
        const drivers = response.drivers;
        const driver_id = response.driver_id;

        if (drivers.length > 0) {
          const loggedInUser = drivers[0];

          this.setToken(loggedInUser.name);
          this.getLoggedInName.emit(true);

          console.log('Logged-in Driver ID:', driver_id);

          return { user: loggedInUser, driver_id };
        } else {
          
          return null;
        }
      }));
}

public driverRegistration(d_name: string, phone: string,  license_no: string, available: string, password: string, email: string) {
    return this.httpClient.post<any>(this.baseUrl + '/driver_register.php', { d_name, phone, license_no, available, password, email })
    .pipe(map(Drivers => {
    return Drivers;
    }));
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const customertoken = this.getToken();
    if (customertoken != null) {
      return true
    }
      return false;
    }
}