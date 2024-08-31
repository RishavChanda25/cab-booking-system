export class Payments {
    public payment_id: number;
    public booking_id: number;
    public mode: string;
    public amount: number;
    public p_status: string;
    
    constructor(payment_id: number, booking_id: number, mode: string, amount: number, p_status: string) {
        this.payment_id = payment_id;
        this.booking_id = booking_id;
        this.mode = mode;
        this.amount = amount;
        this.p_status = p_status;
    }
}