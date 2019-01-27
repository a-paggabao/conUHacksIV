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
    resultDate: string[] = [];
    resultCurrency: any[];
    currencyKeys = ['AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HRK','HUF','IDR','ILS','INR','ISK','JPY','KRW',
                    'MXN','MYR','NOK','NZD','PHP','PLN','PLN','RON','RUB','SEK','SGD','THB','TRY','USD','ZAR']
    constructor(private request:RequestService) { }

    ngOnInit() {
    }

    onSubmit() {
        this.request.baseCurrency = this.name;
        this.request.startDate = this.startDate;
        this.request.getData().subscribe(
            data => {
                let stepCurrency = new Array(data.rates.length)
                let i = 0;
                for(let key in data.rates){
                    if (data.rates.hasOwnProperty(key)){
                        this.resultDate.push(key);
                        stepCurrency[i] = new Array(this.currencyKeys.length);
                        for(let currency in this.currencyKeys){
                            stepCurrency[i][currency] = data.rates[key][this.currencyKeys[currency]];
                        }
                        console.log(i);
                    }
                    i+= 1;

                }
                this.resultCurrency = stepCurrency;
            }
        );
    }
}
