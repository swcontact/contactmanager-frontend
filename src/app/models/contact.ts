/**
 * For Asp.Net core 2.1
 * */
export class Contact {
    public id: number;
    public firstName: string;
    public lastName: string;
    public category: string;
    public contact: string;
    public email: string;
    public birthday: string;
    public telephone: string;
    constructor() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.category = "Customer";
        this.contact = "";
        this.email = "";
        this.birthday = "";
        this.telephone = "";
    }
    
    asignContact(contact: any) {
        if (contact.id == undefined) {
            throw "Parameter is not a valid Contact, contact:" + JSON.stringify(contact);
        }
        this.id = contact.id;
        this.firstName = (contact.firstName !== undefined ? contact.firstName : '');
        this.lastName = (contact.lastName !== undefined ? contact.lastName : '');
        this.category = (contact.category !== undefined ? contact.category : 'Customer');
        this.email = (contact.email !== undefined ? contact.email : '');
        this.birthday = (contact.birthday !== undefined ? contact.birthday : '');
        this.telephone = (contact.telephone !== undefined ? contact.telephone : '');
        this.contact = (contact.contact !== undefined ? contact.contact : '');
    }}

/* For VS2015 Web Api 2
export class Contact {
    public ID: number;
    public FirstName: string;
    public LastName: string;
    public Category: string;
    public contact: string;
    public Email: string;
    public Birthday: string;
    public Telephone: string;
    constructor() {
        this.ID = 0;
        this.FirstName = "";
        this.LastName = "";
        this.Category = "Customer";
        this = "";
        this.Email = "";
        this.Birthday = "";
        this.Telephone = "";
    }
}
*/