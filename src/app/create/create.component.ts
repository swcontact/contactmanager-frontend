import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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

  firstNameValid: boolean = true;
  lastNameValid: boolean = true;
  emailValid: boolean = true;
  birthdayValid: boolean = true;
  telephoneValid: boolean = true;

  profileValid: boolean = true;
  formValid: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private service: ContactService,
    private location: Location
  ) 
  {
    this.newContact();
  }

  ngOnInit() {
    this.service
      .getConfig()
      .subscribe(config => {
        this.config = config;
      });
  }

  onChangeOfContactCategory(val) {
    this.contact.Category = val;
  }

  newContact() {
    this.contact = new Contact();
  }

  onSubmit() {
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validateBirthday();
    this.validateTelephone();

    if (this.contact.Category == "Customer") {
      this.profileValid = this.emailValid && this.birthdayValid;
    } else {
      this.profileValid = this.telephoneValid;
    }
    this.formValid = this.firstNameValid && this.lastNameValid && this.profileValid;

    if (this.formValid) {
      this.service.createContact(
        this.config.url + this.config.createContact, 
        this.contact
      ).subscribe(result => {
        console.log(result);
        this.newContact();
      });
    }
  }

  validateFirstName() {
    this.firstNameValid = true;
    if (this.contact.FirstName.trim() == '') {
      this.firstNameValid = false;
    }
  }
  validateLastName() {
    this.lastNameValid = true;
    if (this.contact.LastName.trim() == '') {
      this.lastNameValid = false;
    }
  }
  validateEmail() {
    this.emailValid = true;
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(this.contact.Email)) {
      this.emailValid = false;
    }
  }
  validateBirthday() {
    this.birthdayValid = true;
    let filter = /^(19|20)\d{2}\-((0[1-9])|(1[0-2]))\-((0[1-9])|([12][0-9])|(3[01]))$/;
    if (this.contact.Birthday !== '' && !filter.test(this.contact.Birthday)) {
      this.birthdayValid = false;
    }
  }
  validateTelephone() {
    this.telephoneValid = true;
    let filter = /^\d{7,12}$/;
    if (!filter.test(this.contact.Telephone)) {
      this.telephoneValid = false;
    }
  }
}
