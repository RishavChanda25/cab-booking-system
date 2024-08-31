export class Drivers {
    public driver_id: number;
    public d_name: string;
    public phone: string;
    public license_no: string;
    
    constructor(driver_id: number, d_name: string, phone: string, license_no: string) {
        this.driver_id = driver_id;
        this.d_name = d_name;
        this.phone = phone;
        this.license_no = license_no;
    }
}