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
    }

    trimWhiteSpace() {
        this.removeBothEndWhiteSpace(this);
    }

    private removeBothEndWhiteSpace (contact: any) {
        contact.firstName = (contact.firstName == undefined || contact.firstName == null ? '' : contact.firstName);
        contact.lastName = (contact.lastName == undefined || contact.lastName == null ? '' : contact.lastName);
        contact.category = (contact.category == undefined || contact.category == null ? '' : contact.category);
        contact.contact = (contact.contact == undefined || contact.contact == null ? '' : contact.contact);
        contact.email = (contact.email == undefined || contact.email == null ? '' : contact.email);
        contact.birthday = (contact.birthday == undefined || contact.birthday == null ? '' : contact.birthday);
        contact.telephone = (contact.telephone == undefined || contact.telephone == null ? '' : contact.telephone);

        contact.firstName = contact.firstName.toString().replace(/^\s+|\s+$/gm,'');
        contact.lastName = contact.lastName.toString().replace(/^\s+|\s+$/gm,'');
        contact.category = contact.category.toString().replace(/^\s+|\s+$/gm,'');
        contact.contact = contact.contact.toString().replace(/^\s+|\s+$/gm,'');
        contact.email = contact.email.toString().replace(/^\s+|\s+$/gm,'');
        contact.birthday = contact.birthday.toString().replace(/^\s+|\s+$/gm,'');
        contact.telephone = contact.telephone.toString().replace(/^\s+|\s+$/gm,'');
    }

    isChanged(contact: any) {
        this.removeBothEndWhiteSpace(this);
        this.removeBothEndWhiteSpace(contact);
        if (
            contact.firstName == undefined || this.firstName != contact.firstName
            || contact.lastName == undefined || this.lastName != contact.lastName
            || contact.category == undefined || this.category != contact.category
            || contact.contact == undefined || this.contact != contact.contact
            || contact.email == undefined || this.email != contact.email
            || contact.birthday == undefined || this.birthday != contact.birthday
            || contact.telephone == undefined || this.telephone != contact.telephone)
        {
            return true;
        }
        return false;
    }

    validateFirstName() {
        return (this.firstName.length > 0 && this.firstName.length <= 50);
    }

    validateLastName() {
        return (this.lastName.length > 0 && this.lastName.length <= 50);
    }

    validateEmail() {
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return filter.test(this.email);
    }

    validateBirthday() {
        let filter = /^(19|20)\d{2}\-((0[1-9])|(1[0-2]))\-((0[1-9])|([12][0-9])|(3[01]))$/;
        return (this.birthday.length <= 0 || filter.test(this.birthday));
    }

    validateTelephone() {
        let filter = /^\d{7,12}$/;
        return (filter.test(this.telephone));
    }    
}

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