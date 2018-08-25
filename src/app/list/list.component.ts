import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  nextPage: number = 2;
  pageSize: number = 5;
  totalPage: number = 0;
  totalCount: number = 0;
  contacts: any;
  loading: boolean = false;

  somethingWrong: string = "";

  constructor (
    private route: ActivatedRoute,
    private service: ContactService,
    private location: Location
  ) { }

  ngOnInit() {
    try{
      this.loading = true;
      this.service
        .getConfig().subscribe(config => {
          this.config = config;
          this.gotoPage(this.currentPage);
      });
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }

  gotoPage(page) {
    try{
      this.loading = true;
      this.service
      .getPage(this.config['url'], page, this.pageSize)
      .subscribe(data => {
        this.contacts = data['contacts']
        this.totalCount = data['count'];
        this.totalPage = Math.ceil(this.totalCount / this.pageSize);
        this.currentPage = page;
        this.previousPage = (page -1 > 0 ? page - 1 : page);
        this.nextPage = (page + 1 > this.totalPage ? this.totalPage : page + 1);
        this.loading = false;
      });
    } catch (e) {
      this.somethingWrong = "Ooop! Something wrong! " + e;
    }
  }

  onDelete(id) {
    /*
    sessionStorage.setItem("delete", contact.id);
    sessionStorage.setItem("url", this.config['url']);
    location.href = '/delete';
    */
   sessionStorage.setItem("delete", id);
  }

}
