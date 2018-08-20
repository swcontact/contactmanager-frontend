import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  config: any;
  contact: any = null;
  contactId: number;

  constructor(
    private route: ActivatedRoute,
    private service: ContactService,
    private location: Location
  ) { }

  ngOnInit() {
    //this.contact = new Contact();
    //    console.log(this.contact);
    this.service
      .getConfig()
      .subscribe(config => {
        this.config = config;
        this.getContact();
      });
  }

  getContact(): void {
    this.contactId = +this.route.snapshot.paramMap.get('id');

    if (this.contactId > 0) {
      this.service.getContact(this.config['url'], this.contactId)
      .subscribe(contact => {
        //this.contact = new Contact();
        //console.log(this.contact);
        if (contact !== undefined && contact !== null){
          this.contact = contact;
        }else{
          this.contact = new Contact();
        }
        //console.log(this.contact);
      });
    }else{
      this.contactId = 0;
      this.contact = new Contact();
    }
  }

  onChangeOfContactCategory(val) {
    this.contact.contactCategory = val;
  }
}
