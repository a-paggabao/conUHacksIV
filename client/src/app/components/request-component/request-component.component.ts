import { RequestService } from "src/app/service/request.service";
import { OnInit, Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ActivatedRoute } from "@angular/router";
import { rgb } from "@amcharts/amcharts4/.internal/core/utils/Colors";
import { max } from "@amcharts/amcharts4/.internal/core/utils/Math";
import am4themes_dark from "@amcharts/amcharts4/themes/amchartsdark";
import { SUPPORTED_CURRENCIES } from "src/app/supportedcurrencies.model";
import { Grid } from "ag-grid-community";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

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
  rowData = [];
  columnDefs = [];
  currencyKeys: string[] = SUPPORTED_CURRENCIES;
  valueKey = 0;
  gridApi: any;
  gridColumnApi: any;

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
    this.compCurrencyCode = this.activatedRoute.snapshot.paramMap.get(
      "compared"
    );
    this.getChart();
  }

  getChart() {
    this.request.baseCurrency = this.baseCurrencyCode;
    if (this.currencyKeys.indexOf(this.compCurrencyCode)) {
      this.valueKey = this.currencyKeys.indexOf(this.compCurrencyCode);
    }
    this.request.startDate = "2009-11-01";
    this.request.getData().subscribe(data => {
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

        chart.width = am4core.percent(100);
        chart.height = am4core.percent(100);

        chart.paddingRight = 20;

        let data = [];
        const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
        let sum = 0;
        for (let i = 0; i < this.resultDate.length; i++) {
          sum += this.resultCurrency[i][this.valueKey];
        }
        let averageData = sum / this.resultDate.length;
        for (let i = 0; i < this.resultDate.length; i++) {
          data.push({
            date: this.resultDate[i],
            name: "name" + i,
            value: this.resultCurrency[i][this.valueKey]
          });

          if (this.resultCurrency[i][this.valueKey] >= averageData) {
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
        dateAxis.title.text = "Date";
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.tooltip.background.pointerLength = 4;
        dateAxis.tooltip.background.fillOpacity = 0;
        dateAxis.tooltip.background.fill = am4core.color("#000000");
        dateAxis.tooltip.background.stroke = dateAxis.tooltip.background.fill;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Currency";
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

        chart.background.opacity = 0;

        this.chart = chart;

        let mappedData = data.map(x => parseFloat(x.value));

        this.columnDefs = [
          { headerName: "", field: "row" },
          { headerName: "30 days", field: "thirty" },
          { headerName: "90 days", field: "ninety" },
          { headerName: "1 year", field: "year" }
        ];

        this.rowData = [
          {
            row: "Highest",
            thirty: parseFloat(Math.max.apply(null, mappedData.slice(-30))).toFixed(6),
            ninety: parseFloat(Math.max.apply(null, mappedData.slice(-90))).toFixed(6),
            year: parseFloat(Math.max.apply(null, mappedData.slice(-365))).toFixed(6)
          },
          {
            row: "Lowest",
            thirty: parseFloat(Math.min.apply(null, mappedData.slice(-30))).toFixed(6),
            ninety: parseFloat(Math.min.apply(null, mappedData.slice(-30))).toFixed(6),
            year: parseFloat(Math.min.apply(null, mappedData.slice(-30))).toFixed(6)
          },
          {
            row: "Average",
            thirty: average(mappedData.slice(-30)).toFixed(6),
            ninety: average(mappedData.slice(-30)).toFixed(6),
            year: average(mappedData.slice(-30)).toFixed(6)
          }
        ];
      });
    });
    this.submitted = true;

    this.zone.runOutsideAngular(() => {});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
}
