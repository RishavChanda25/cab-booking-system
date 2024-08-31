import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Bookings } from '../models/bookings';

@Injectable({
  providedIn: 'root'
})
export class RideHistoryService {

  redirectUrl: string | undefined;
  baseUrl:string = "http://localhost/cab-booking-system/php";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient : HttpClient) { }

  public getRideHistory(cust_id: number, starting_date: string, end_date: string) {
    // alert("Rishav");
    return this.httpClient.post<any>(this.baseUrl + '/ride_history.php', { cust_id, starting_date, end_date });
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
