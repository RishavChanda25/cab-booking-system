export class Customers {
    public cust_id: number;
    public name: string;
    public phone: string;
    public email: string;
    public password: string;
    public address: string;
    public acc_no: string;
    
    constructor(cust_id: number, name: string, password: string, email: string, phone: string, address: string, acc_no: string) {
        this.cust_id = cust_id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.address = address;
        this.acc_no = acc_no;
    }
}