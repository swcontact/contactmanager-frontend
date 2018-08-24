import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  config: any;
  currentPage: number = 1;
  pageSize: number = 5;
  totalCount: number = 0;
  contacts: any;
  loading: boolean = false;

  constructor (private service: ContactService) { }

  ngOnInit() {
    this.loading = true;
    this.service
      .getConfig().subscribe(config => {
        this.config = config;
        this.service
        .getAllContacts(this.config['url'] + this.config['getAll'])
        .subscribe(contacts => {
          this.contacts = contacts;
          this.loading = false;
          console.log(contacts);
        });
  
      });
  }

  getProfileInfo(contact) {
    //console.log("get info");
    //console.log(contact);
    /*
    let result: string = '';
    if (contact.email.length > 0) {
      result += contact.email;
    }
    if (contact.birthday.length > 0) {
      result += (result == '' ? '' : ', ') + "Birthday:" + contact.birthday.split('T')[0];
    }
    if (contact.telephone.length > 0) {
      result += (result == '' ? '' : ', ') + contact.telephone;
    }

    return result;
    */
  }

  onDelete(contact: any) {
    let yesno = confirm(`Do you want to delete <${contact.firstName} ${contact.lastName}>?`);
    console.log("yesno="+yesno);
  }

}
