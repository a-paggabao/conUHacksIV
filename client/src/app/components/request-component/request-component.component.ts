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
    result: any;
    constructor(private request:RequestService) { }

    ngOnInit() {
    }

    onSubmit() {
        this.request.baseCurrency = this.name;
        this.request.startDate = this.startDate;
        this.request.getData().subscribe(
            data => {
                console.log(data)
                this.result = data;
            }
        );
    }
}