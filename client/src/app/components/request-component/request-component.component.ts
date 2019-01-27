import { RequestService } from "src/app/service/request.service";
import { OnInit, Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ActivatedRoute } from "@angular/router";
import { rgb } from "@amcharts/amcharts4/.internal/core/utils/Colors";
import { max } from '@amcharts/amcharts4/.internal/core/utils/Math';

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-request-component",
  templateUrl: "./request-component.component.html",
  styleUrls: ["./request-component.component.scss"]
})
export class RequestComponent implements OnInit {
  private chart: am4charts.XYChart;
  submitted = false;
  baseCurrencyCode: string;
  compCurrencyCode: string;
  name = "";
  startDate = "";
  resultDate: string[] = [];
  resultCurrency: any[];
  currencyKeys = [
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "PLN",
    "RON",
    "RUB",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "USD",
    "ZAR"
  ];
  rowData = [];
  columnDefs = [];
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
  constructor(
    private request: RequestService,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.baseCurrencyCode = this.activatedRoute.snapshot.paramMap.get("base");
    this.compCurrencyCode = this.activatedRoute.snapshot.paramMap.get("compared");
    console.log(this.baseCurrencyCode);
    console.log(this.compCurrencyCode);
    this.getChart();
  }

  getChart() {
    this.request.baseCurrency = this.baseCurrencyCode;
    this.request.startDate = "2009-11-01";
    this.request.getData().subscribe(data => {
      console.log(data);
      let stepCurrency = new Array(data.rates.length);
      let i = 0;
      for (let key in data.rates) {
        if (data.rates.hasOwnProperty(key)) {
          this.resultDate.push(key);
          stepCurrency[i] = new Array(this.currencyKeys.length);
          for (let currency in this.currencyKeys) {
            stepCurrency[i][currency] =
              data.rates[key][this.currencyKeys[currency]];
          }
        }
        i += 1;
      }
      this.resultCurrency = stepCurrency;
      this.zone.runOutsideAngular(() => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        let data = [];
        for (let i = 0; i < this.resultDate.length; i++) {
          data.push({
            date: this.resultDate[i],
            name: "name" + i,
            value: this.resultCurrency[i][1]
          });

          if (this.resultCurrency[i][1] >= 1.5) {
            data[i].color = am4core.color("#3f2698");
          } else {
            data[i].color = am4core.color("#84279a");
          }
        }
        data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.tooltip.background.pointerLength = 4;
        dateAxis.tooltip.background.fillOpacity = 1;
        dateAxis.tooltip.background.fill = am4core.color("#666666");
        dateAxis.tooltip.background.stroke = dateAxis.tooltip.background.fill;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.strokeWidth = 1;
        series.tooltipText = "{valueY.value}";
        series.tooltip.background.fillOpacity = 0.3;
        series.tooltip.background.fill = am4core.color("white");
        series.propertyFields.stroke = "color";
        chart.cursor = new am4charts.XYCursor();


        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

        this.chart = chart;
        this.columnDefs = [
            {headerName: '', field: 'row' },
            {headerName: '30 days', field: 'thirty' },
            {headerName: '90 days', field: 'ninety'},
            {headerName: '1 year', field: 'year'}
    
        ];
        let mappedData = data.map(x => parseFloat(x.value));
        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
        this.rowData = [
            { row: 'Highest', thirty: Math.max.apply(null, mappedData.slice(-30)), ninety: Math.max.apply(null, mappedData.slice(-90)), year: Math.max.apply(null, mappedData.slice(-365))},
            { row: 'Lowest', thirty: Math.min.apply(null,mappedData.slice(-30)), ninety: Math.min.apply(null,mappedData.slice(-30)), year: Math.min.apply(null,mappedData.slice(-30))},
            { row: 'Average', thirty: average(mappedData.slice(-30)), ninety: average(mappedData.slice(-30)), year: average(mappedData.slice(-30))}
        ];
      });
    });
    this.submitted = true;

    this.zone.runOutsideAngular(() => {});
  }
}
