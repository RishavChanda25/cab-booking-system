import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Customers } from '../models/customers';

@Injectable({
  providedIn: 'root'
})
export class ManageProfileService {

  redirectUrl: string | undefined;
  baseUrl:string = "http://localhost/cab-booking-system/php";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient : HttpClient) { }

  public getProfile(cust_id: number) {
    // alert("Rishav");
    return this.httpClient.post<any>(this.baseUrl + '/get_profile.php', { cust_id });
  }

  public updateDetails(cust_id: number, name: string, email: string, phone: string, password: string, address: string, acc_no: string) {
    return this.httpClient.post<any>(this.baseUrl + '/update_details.php', { cust_id, name, email, phone, password, address, acc_no })
    .pipe(map(Customers => {
    return Customers;
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


}
