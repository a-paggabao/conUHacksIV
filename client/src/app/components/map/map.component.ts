import { Component, OnInit, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { Router } from "@angular/router";
import { currencies, countries } from "country-data";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  private chart: am4maps.MapChart;
  public fade = false;

  constructor(private zone: NgZone, private route: Router) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4maps.MapChart);

      /* Set map definition */
      chart.geodata = am4geodata_worldLow;

      /* Set projection */
      chart.projection = new am4maps.projections.Miller();

      /* Create map polygon series */
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      /* Make map load polygon (like country names) data from GeoJSON */
      polygonSeries.useGeodata = true;

      /* Configure series */
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.applyOnClones = true;
      polygonTemplate.togglable = true;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.strokeWidth = 0.5;
      polygonTemplate.strokeOpacity = 0.5;
      polygonTemplate.fill = chart.colors.getIndex(0);

      let lastSelected;
      function fade(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

      polygonTemplate.events.on("hit", ev => {
        let countryID = ev.target.dataItem.dataContext["id"];
        console.log(this.getCurrencyCode(countryID))
        if (lastSelected) {
          lastSelected.isActive = false;
        }
        // ev.target.series.chart.zoomToMapObject(ev.target);
        // this.zone.run(() => this.route.navigate(['balls']));

        if (lastSelected !== ev.target) {
          lastSelected = ev.target;
        }
      });

      /* Create selected and hover states and set alternative fill color */
      let ss = polygonTemplate.states.create("active");
      ss.properties.fill = chart.colors.getIndex(5).brighten(-0.5);

      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

      // Hide Antarctica
      polygonSeries.exclude = ["AQ"];

      // Zoom control
      chart.zoomControl = new am4maps.ZoomControl();

      let homeButton = new am4core.Button();
      homeButton.events.on("hit", function() {
        chart.goHome();
      });

      homeButton.icon = new am4core.Sprite();
      homeButton.padding(7, 5, 7, 5);
      homeButton.width = 20;
      homeButton.icon.path =
        "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
      homeButton.marginBottom = 10;
      homeButton.parent = chart.zoomControl;
      homeButton.insertBefore(chart.zoomControl.plusButton);

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  getCurrencyCode(countryID: string): string {
    return countries[countryID].currencies[0]
  }
}
