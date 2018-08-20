export class Contact {
    public id: number;
    public firstName: string;
    public lastName: string;
    public contactCategory: string;
    public birthday: Date;
    public email: string;
    public telephone: string;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.contactCategory = 'Customer';
        this.birthday = new Date();
        this.email = '';
        this.telephone = '';
    }
}