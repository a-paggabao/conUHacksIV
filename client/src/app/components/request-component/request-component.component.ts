import { RequestService } from 'src/app/service/request.service';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-request-component',
    templateUrl: './request-component.component.html',
    styleUrls: ['./request-component.component.scss']
})
export class RequestComponent implements OnInit {
    name = '';
    startDate = '';
    constructor(private request:RequestService) { }

    ngOnInit() {
    this.request.baseCurrency = 'USD';
    this.request.startDate = '2018-01-01'
    this.request.getData();
    }

    ngOnSubmit() {
        this.request.baseCurrency = this.name;
        this.request.startDate = this.startDate;
        this.request.getData();
    }
}