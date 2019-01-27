import { Component, OnInit } from "@angular/core";
import APP_CONFIG from "../../app.config";
import { Injectable } from "@angular/core";
import { Node, Link } from "../../d3";
import { HttpClient } from "@angular/common/http";
import { RequestService } from "src/app/service/request.service";
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { SUPPORTED_CURRENCIES } from "src/app/supportedcurrencies.model";

@Component({
  selector: "app-balls",
  templateUrl: "./balls.component.html",
  styleUrls: ["./balls.component.scss"]
})
@Injectable({ providedIn: "root" })
export class BallsComponent implements OnInit {
  nodes: Node[] = [];
  links: Link[] = [];
  data;

  ngOnInit() {
    let base = "EUR"
    this.service.getCurrentData(base).subscribe(data => {
      let ratesArr = new Array();
      for (let i = 0; i < Object.keys(data.rates).length; i++) {
        ratesArr.push({code: Object.keys(data.rates)[i], value: Object.values(data.rates)[i]})

        let amount = 500;
      }
    });
  }

  constructor(private service: RequestService) {
    let baseCurrency = "EUR";

    this.service.getCurrentData(baseCurrency).subscribe(data => {

      let ratesArr = new Array();
      for (let i = 0; i < Object.keys(data.rates).length; i++) {
        ratesArr.push({code: Object.keys(data.rates)[i], value: Object.values(data.rates)[i]})

        let amount = 500;
      }
      const N = Object.keys(data.rates).length,
        getIndex = (number: any) => number - 1;

      /** constructing the nodes array */
      for (let i = 0; i < Object.keys(data.rates).length; i++) {
        let amount = 500;
        this.nodes.push(new Node(this.convert(amount, ratesArr[i].value)));
      }

      for (let i = 1; i <= N; i++) {
        for (let m = 2; i * m <= N; m++) {
          /** increasing connections toll on connecting nodes */
          this.nodes[getIndex(i)].linkCount++;
          this.nodes[getIndex(i * m)].linkCount++;

          /** connecting the nodes before starting the simulation */
          this.links.push(new Link(this.nodes[getIndex(i)], this.nodes[getIndex(i * m)]));

        }
      }
    });
  }

  convert(amount, next) {
    return (next * amount).toFixed(2);
  }
}
