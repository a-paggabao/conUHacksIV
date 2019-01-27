import { RequestService } from 'src/app/service/request.service';
import { OnInit, Component, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-request-component',
    templateUrl: './request-component.component.html',
    styleUrls: ['./request-component.component.scss']
})
export class RequestComponent implements OnInit {
    private chart: am4charts.XYChart;
    submitted = false;
    name = '';
    startDate = '';
    resultDate: string[] = [];
    resultCurrency: any[];
    currencyKeys = ['AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HRK','HUF','IDR','ILS','INR','ISK','JPY','KRW',
                    'MXN','MYR','NOK','NZD','PHP','PLN','PLN','RON','RUB','SEK','SGD','THB','TRY','USD','ZAR']

    ngOnDestroy() {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          this.chart.dispose();
        }
      });
    }
    constructor(private request:RequestService, private zone: NgZone) { }

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
                    }
                    i+= 1;

                }
                this.resultCurrency = stepCurrency;
                this.zone.runOutsideAngular(() => {
                    let chart = am4core.create("chartdiv", am4charts.XYChart);
              
                    chart.paddingRight = 20;
              
                    let data = [];
                    for (let i = 0; i < this.resultDate.length; i++) {
                      data.push({ date: this.resultDate[i], name: "name" + i, value: this.resultCurrency[i][1] });
                    }
                    data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    chart.data = data;
              
                    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                    dateAxis.renderer.grid.template.location = 0;
              
                    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.tooltip.disabled = true;
                    valueAxis.renderer.minWidth = 35;
              
                    let series = chart.series.push(new am4charts.LineSeries());
                    series.dataFields.dateX = "date";
                    series.dataFields.valueY = "value";
              
                    series.tooltipText = "{valueY.value}";
                    chart.cursor = new am4charts.XYCursor();
              
                    let scrollbarX = new am4charts.XYChartScrollbar();
                    scrollbarX.series.push(series);
                    chart.scrollbarX = scrollbarX;
              
                    this.chart = chart;
                });    
            }
        );
        this.submitted = true;

        this.zone.runOutsideAngular(() => {
            
    });
}
}
