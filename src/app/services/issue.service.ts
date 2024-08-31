import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Issues } from '../models/issues';

@Injectable({
  providedIn: 'root'
})

export class IssueService {

  redirectUrl: string | undefined;
  baseUrl:string = "http://localhost/cab-booking-system/php";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient : HttpClient) { }

  public reportIssue(cust_id: number, issue_type: string, booking_id: number, description: string, i_status: string) {
    return this.httpClient.post<any>(this.baseUrl + '/report_issues.php', { cust_id, issue_type, booking_id, description, i_status })
    .pipe(map(Issues => {
    return Issues;
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
