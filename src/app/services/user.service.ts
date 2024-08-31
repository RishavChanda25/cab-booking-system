import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private custIdSubject = new BehaviorSubject<number>(10);
  cust_id$ = this.custIdSubject.asObservable();
  cust_id : number = 0;

  private bookingIdSubject = new BehaviorSubject<number>(10);
  booking_id$ = this.bookingIdSubject.asObservable();
  booking_id: number = 0;
  standard_fee: number = 0;
  booked_driver_id: number = 0;

  private driverIdSubject = new BehaviorSubject<number>(1);
  driver_id$ = this.driverIdSubject.asObservable();
  driver_id : number = 0;
  booked_cust_id: number = 0;

  ride_booked: boolean = false;

  setCustId(cust_id: number) {
    this.custIdSubject.next(cust_id);
    this.cust_id = this.custIdSubject.getValue();
    // alert(`New custIdSubject value: ${this.cust_id}`);
  }

  setBookingId(booking_id: number) {
    this.booking_id = booking_id;
    this.bookingIdSubject.next(booking_id);
    // this.booking_id = this.bookingIdSubject.getValue();
    // alert(`New bookingIdSubject value: ${this.booking_id}`);
    if (booking_id != 0)
      this.ride_booked = true;
    this.standard_fee = Math.random() * 1000;
  }

  setDriverId(driver_id: number) {
    this.driverIdSubject.next(driver_id);
    this.driver_id = this.driverIdSubject.getValue();
    alert(`New driverIdSubject value: ${this.driver_id}`);
  }
}
