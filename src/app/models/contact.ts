export class Contact {
    public ID: number;
    public FirstName: string;
    public LastName: string;
    public Category: string;
    public Profile: string;
    public Email: string;
    public Birthday: string;
    public Telephone: string;
    constructor() {
        this.ID = 0;
        this.FirstName = "";
        this.LastName = "";
        this.Category = "Customer";
        this.Profile = "";
        this.Email = "";
        this.Birthday = "";
        this.Telephone = "";
    }
}