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
  previousPage: number = 1;
  nextPage: number = 1;
  pageSize: number = 5;
  totalPage: number = 0;
  totalCount: number = 0;
  contacts: any;
  loading: boolean = false;

  jumpTo: number = 1;

  somethingWrong: string = "";

  constructor (private service: ContactService) { }

  ngOnInit() {
    try{
      this.loading = true;
      this.service.getConfig().subscribe(config => {
        this.config = config;
      }, err => {
        this.loading = false;
        this.somethingWrong = "Getting config file failed. " + err;
      }, () => {
        this.gotoPage(this.currentPage);
      });
    } catch (e) {
      this.loading = false;
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }

  jumpToPage (page) {
    if (page == this.currentPage || page < 1 || page > this.totalPage) return;
    this.gotoPage(page);
  }

  gotoPage(page) {
    this.somethingWrong = '';
    try{
      this.loading = true;
      this.service.getPage(this.config['url'], page, this.pageSize).subscribe(data => {
        this.contacts = data['contacts']
        this.totalCount = data['count'];
        this.totalPage = Math.ceil(this.totalCount / this.pageSize);
        this.currentPage = page;
        this.previousPage = (page -1 > 0 ? page - 1 : page);
        this.nextPage = (page + 1 > this.totalPage ? this.totalPage : page + 1);
        this.loading = false;
      }, err => {
        this.loading = false;
        this.somethingWrong = "Server error: " + err;
      }, () => {
      });
    } catch (e) {
      this.loading = false;
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }

  onDelete(id) {
   sessionStorage.setItem("delete", id);
  }

}
