import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  config: any;
  contact: Contact;
  lastContact: any;
  noChange: boolean = false;
  saved: boolean = false;
  saving: boolean = false;
  somethingWrong: string = "";

  firstNameValid: boolean = true;
  lastNameValid: boolean = true;
  emailValid: boolean = true;
  birthdayValid: boolean = true;
  telephoneValid: boolean = true;

  contactValid: boolean = true;
  formValid: boolean = true;
  lastSavedName: string = '';

  constructor(private service: ContactService) { }

  ngOnInit() {
    this.contact = new Contact();
    this.lastContact = new Contact();

    this.service.getConfig().subscribe(config => {
      this.config = config;
    }, err => {
      this.somethingWrong = "Getting config file failed. " + err;
    }, () => {

    });
  }

  onChangeOfContactCategory(val) {
    this.contact.category = val;
    this.saved = false;
  }

  onChange() {
    this.saved = false;
  }

  onSubmit() {
    this.saving = true;
    this.somethingWrong = '';
    this.contact.trimWhiteSpace();
    this.noChange = !this.contact.isChanged(this.lastContact);
    if (this.noChange) {
      this.saved = false;
      this.saving = false;
      return;
    }    

    this.firstNameValid = this.contact.validateFirstName();
    this.lastNameValid = this.contact.validateLastName();
    this.emailValid = this.contact.validateEmail();
    this.birthdayValid = this.contact.validateBirthday();
    this.telephoneValid = this.contact.validateTelephone();

    if (this.contact.category == "Customer") {
      this.contactValid = this.emailValid && this.birthdayValid;
      this.contact.telephone = "";
    } else {
      this.contactValid = this.telephoneValid;
      this.contact.email = "";
      this.contact.birthday = "";
    }
    this.formValid = this.firstNameValid && this.lastNameValid && this.contactValid;

    if (this.formValid) {
      try {
        this.somethingWrong = "";
        this.saved = false;
        this.service.createContact(this.config.url, this.contact).subscribe(result => {
          this.saved = true;
          this.lastSavedName = `${this.contact.firstName} ${this.contact.lastName}`;
          this.contact.id = 0;
        }, err => {
          this.somethingWrong = 'Server error: Save contact failed! ' + err;
          this.saving = false;
        }, () => {
          this.lastContact = Object.assign({}, this.contact);
          this.saving = false;
        });
      } catch (e) {
        this.somethingWrong = "Ooop! Something wrong! " + e;
        this.saving = false;
      }
    } else {
      this.somethingWrong = "Validation failed! ";
      this.saving = false;
    }
  }
}
