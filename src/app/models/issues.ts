export class Issues {
    public report_id: number;
    public cust_id: number;
    public issue_type: string;
    public description: string;
    public i_status: string;
    
    constructor(report_id: number, cust_id: number, issue_type: string, description: string, i_status: string) {
        this.report_id = report_id;
        this.cust_id = cust_id;
        this.issue_type = issue_type;
        this.description = description;
        this.i_status = i_status;
    }
}