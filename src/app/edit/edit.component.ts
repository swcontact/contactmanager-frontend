import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  config: any;
  contact: Contact;
  contactId: number;
  somethingWrong: string = "";

  firstNameValid: boolean = true;
  lastNameValid: boolean = true;
  emailValid: boolean = true;
  birthdayValid: boolean = true;
  telephoneValid: boolean = true;

  contactValid: boolean = true;
  formValid: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private service: ContactService,
    private location: Location
  ) { }

  ngOnInit() {
    try {
      this.contact = new Contact();
      this.contactId = +this.route.snapshot.paramMap.get('id');
      if (this.contactId <= 0) {
        throw `Invalid contact id: (${this.contactId})`;
      }

      this.service.getConfig().subscribe(config => {
        this.config = config;
      }, err => {
        this.somethingWrong = "Getting config file failed. " + err;
      }, () => {
        this.getContact();
      });
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }

  getContact(): void {
    try {
      this.service.getContact(this.config['url'], this.contactId).subscribe(contact => {
        if (contact !== undefined && contact !== null){
          this.contact.asignContact(contact);
        } else {
          this.somethingWrong = "Contact is empty!";
        }
      }, err => {
        this.somethingWrong = 'Server error: Getting contact failed! ' + err;
      }, () => {});
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }
/*
  asignContact(contact: any) {
    try {
      if (contact.id == undefined) {
        throw "Server returned a non contact object.";
      }
      this.contact.id = contact.id;
      this.contact.firstName = (contact.firstName !== undefined ? contact.firstName : '');
      this.contact.lastName = (contact.lastName !== undefined ? contact.lastName : '');
      this.contact.category = (contact.category !== undefined ? contact.category : 'Customer');
      this.contact.email = (contact.email !== undefined ? contact.email : '');
      this.contact.birthday = (contact.birthday !== undefined ? contact.birthday : '');
      this.contact.telephone = (contact.telephone !== undefined ? contact.telephone : '');
      this.contact.contact = (contact.contact !== undefined ? contact.contact : '');
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }
*/
  onChangeOfContactCategory(val) {
    this.contact.category = val;
  }
/*
  newContact() {
    this.contact = new Contact();
  }
*/
  onSubmit() {
    try{
      this.validateFirstName();
      this.validateLastName();
      this.validateEmail();
      this.validateBirthday();
      this.validateTelephone();

      if (this.contact.category == "Customer") {
        this.contactValid = this.emailValid && this.birthdayValid;
      } else {
        this.contactValid = this.telephoneValid;
      }
      this.formValid = this.firstNameValid && this.lastNameValid && this.contactValid;

      if (this.formValid) {
        this.service.updateContact(
          this.config.url + '/' + this.contactId,
          this.contact
        ).subscribe(result => {
          location.href = "/list";
        });
      }
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
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
