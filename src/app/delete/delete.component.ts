import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  contact: Contact;
  storedContact: string;
  properWay: boolean = false;
  config: any;
  somethingWrong: string = "";

  contactId: number;

  constructor(
    private route: ActivatedRoute,
    private service: ContactService,
    private location: Location
  ) { }

  ngOnInit() {
    this.contactId = +this.route.snapshot.paramMap.get('id');
    if (+sessionStorage.getItem("delete") != this.contactId) {
      this.properWay = false;
    }else{
      this.properWay = true;
      sessionStorage.clear();
      try {
        this.service
          .getConfig()
          .subscribe(config => {
            this.config = config;
            this.getContact();
        });
      } catch (e) {
        this.somethingWrong = "Ooop! Something wrong! " + e;
      }
    }

    /*
    this.storedContact = sessionStorage.getItem('delete');
    this.url = sessionStorage.getItem('url');
    //remove them immediately
    sessionStorage.clear();

    if (this.storedContact && this.url) {
      this.properWay = true;
      this.contact = JSON.parse(this.storedContact);
      //console.log(this.contact);
    }else{
      this.properWay = false;
    }
    */
  }

  getContact(): void {
    try {
      this.contactId = +this.route.snapshot.paramMap.get('id');

      if (this.contactId > 0) {
        this.service.getContact(this.config['url'], this.contactId)
        .subscribe(contact => {
          //console.log(contact);
          if (contact !== undefined && contact !== null){
            this.asignContact(contact);
          }
        });
      }
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }

  }

  asignContact(contact: any) {
    try {
      this.contact = new Contact;
      this.contact.id = contact.id;
      this.contact.firstName = contact.firstName;
      this.contact.lastName = contact.lastName;
      this.contact.category = contact.category;
      this.contact.email = contact.email;
      this.contact.birthday = contact.birthday;
      this.contact.telephone = contact.telephone;
      this.contact.contact = contact.contact;
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }
  onDelete(contact: any) {
    try {
      let yesno = confirm(`Do you really want to delete <${contact.firstName} ${contact.lastName}>?`);
      //console.log(this.url);
      //console.log(contact.id);    
      if (yesno) {
        let result = this.service.deleteContact(this.config['url'], contact.id).subscribe(result => {
          //console.log(result);
          location.href = '/list';
        });
      }
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }
}
