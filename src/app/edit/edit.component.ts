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
  lastContact: any;
  noChange: boolean = false;
  somethingWrong: string = "";
  properWay: boolean = false;
  loading: boolean = true;
  saving: boolean = false;

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
    this.loading = true;
    try {
      this.contact = new Contact();
      this.contactId = +this.route.snapshot.paramMap.get('id');
      if (this.contactId <= 0) {
        throw `Invalid contact id: (${this.contactId})`;
      }

      if (+sessionStorage.getItem("edit") != this.contactId) {
        this.properWay = false;
        throw "You cannot edit a record in this way!";
      }else{
        this.properWay = true;
        sessionStorage.clear();
        this.service.getConfig().subscribe(config => {
          this.config = config;
        }, err => {
          this.loading = false;
          this.somethingWrong = "Getting config file failed. " + err;
        }, () => {
          this.getContact();
        });
      }
    } catch (e) {
      this.loading = false;
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
        this.loading = false;
      }, err => {
        this.loading = false;
        this.somethingWrong = 'Server error: Getting contact failed! ' + err;
      }, () => {
        this.loading = false;
        this.lastContact = Object.assign({}, this.contact);
      });
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }

  onChangeOfContactCategory(val) {
    this.contact.category = val;
  }

  onSubmit() {
    try{
      this.saving = true;
      this.somethingWrong = '';
      this.contact.trimWhiteSpace();
      this.noChange = !this.contact.isChanged(this.lastContact);
      if (this.noChange) {
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
        }, err => {
          this.somethingWrong = "Server error: update contact failed! " + err;
          this.saving = false;
        }, () => {
          
        });
      } else {
        this.saving = false;
        this.somethingWrong = "Validation failed! ";
      }
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
      this.saving = false;
    }

  }
}
