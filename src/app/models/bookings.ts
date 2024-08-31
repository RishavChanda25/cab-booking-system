export class Bookings {
    public booking_id: number;
    public cust_id: number;
    public driver_id: number;
    public pickup: string;
    public dropoff: string;
    public ride_type: string;
    public rating: number;
    public feedback: string;
    public status: string;
    public cancel_cause: string;
    public booking_date: string;
    
    constructor(booking_id: number, cust_id: number, driver_id: number, pickup: string, dropoff: string, ride_type: string, rating: number, feedback: string, status: string, cancel_cause: string, booking_date: string) {
        this.booking_id = booking_id;
        this.cust_id  = cust_id;
        this.driver_id = driver_id;
        this.pickup = pickup;
        this.dropoff = dropoff;
        this.ride_type = ride_type;
        this.rating = rating;
        this.feedback = feedback;
        this.status = status;
        this.cancel_cause = cancel_cause;
        this.booking_date = booking_date;
    }
}