import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Bookings } from '../models/bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  redirectUrl: string | undefined;
  baseUrl:string = "http://localhost/cab-booking-system/php";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient : HttpClient) { }

  

  public bookRide(cust_id: number, driver_id: number, pickup: string, dropoff: string, ride_type: string, rating: number, feedback: string, status: string, cancel_cause: string, booking_date: string) {
    return this.httpClient.post<any>(this.baseUrl + '/book_ride.php', { cust_id, driver_id, pickup, dropoff, ride_type, rating, feedback, status, cancel_cause, booking_date })
      .pipe(map(response => {
        const booking_id = response.booking_id;
        if ('booking_id' in response) {
          // You can access the booking_id here
          alert(`Booking ID: ${booking_id}`);
        }
        return { response, booking_id };
      })); //
    }

  public completeRide(booking_id: number, driver_id: number, rating: number, feedback: string) {
    alert(feedback);
    return this.httpClient.post<any>(this.baseUrl + '/complete_ride.php', { booking_id: booking_id, driver_id: driver_id, rating: rating, feedback: feedback });
  }

  public cancelRide(booking_id: number, cancel_cause: string) {
    alert(cancel_cause);
    return this.httpClient.post<any>(this.baseUrl + '/cancel_ride.php', { booking_id: booking_id, cancel_cause: cancel_cause });
  }

  public payForRide(booking_id: number, mode: string, amount: number, p_status: string) {
    return this.httpClient.post<any>(this.baseUrl + '/payment.php', { booking_id, mode, amount, p_status })
    .pipe(map(Payments => {
    return Payments;
    }));
  }

  public fetchDrivers(available: string) {
    // alert("Rishav");
    return this.httpClient.post<any>(this.baseUrl + '/fetch_drivers.php', { available });
  }

  public fetchCustomers(available: string) {
    // alert("Rishav");
    return this.httpClient.post<any>(this.baseUrl + '/fetch_customers.php', { available });
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
