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

  config: any;
  contact: Contact;
  contactId: number;
  somethingWrong: string = "";
  properWay: boolean = false;

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

      if (+sessionStorage.getItem("delete") != this.contactId) {
        this.properWay = false;
        throw "You cannot delete a record in this way!";
      }else{
        this.properWay = true;
        sessionStorage.clear();
        this.service.getConfig().subscribe(config => {
          this.config = config;
        }, err => {
          this.somethingWrong = "Getting config file failed. " + err;
        }, () => {
          this.getContact();
        });
      }
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

  onDelete(contact: any) {
    try {
      let yesno = confirm(`Do you really want to delete <${contact.firstName} ${contact.lastName}>?`);
      if (yesno) {
        let result = this.service.deleteContact(this.config['url'], contact.id).subscribe(result => {
          location.href = '/list';
        });
      }
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }
}
