import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private request:RequestService) { }

  ngOnInit() {
    this.request.base_currency = 'USD';
    this.request.start_date = '2018-01-01'
    this.request.getData();
  }
}
