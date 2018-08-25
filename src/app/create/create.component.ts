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
  saved: boolean = false;
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
    this.somethingWrong = '';
    this.contact.trimWhiteSpace();

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
        }, () => {

        });
      } catch (e) {
        this.somethingWrong = "Ooop! Something wrong! " + e;
      }
    }
  }
}
