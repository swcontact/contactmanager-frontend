import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
//import { Location } from '@angular/common';
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

  constructor(
//    private route: ActivatedRoute,
    private service: ContactService
    //private location: Location
  ) 
  {

  }

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
/*
  newContact() {
    this.contact = new Contact();
  }
*/
  onChange() {
    this.saved = false;
  }

  onSubmit() {
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validateBirthday();
    this.validateTelephone();

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

  validateFirstName() {
    this.firstNameValid = true;
    if (this.contact.firstName.trim() == '') {
      this.firstNameValid = false;
    }
  }
  validateLastName() {
    this.lastNameValid = true;
    if (this.contact.lastName.trim() == '') {
      this.lastNameValid = false;
    }
  }
  validateEmail() {
    this.emailValid = true;
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(this.contact.email)) {
      this.emailValid = false;
    }
  }
  validateBirthday() {
    this.birthdayValid = true;
    let filter = /^(19|20)\d{2}\-((0[1-9])|(1[0-2]))\-((0[1-9])|([12][0-9])|(3[01]))$/;
    if (this.contact.birthday !== '' && !filter.test(this.contact.birthday)) {
      this.birthdayValid = false;
    }
  }
  validateTelephone() {
    this.telephoneValid = true;
    let filter = /^\d{7,12}$/;
    if (!filter.test(this.contact.telephone)) {
      this.telephoneValid = false;
    }
  }
}
