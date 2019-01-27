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
        // console.log(ratesArr[i].code, this.convert(amount, ratesArr[i].value))
      }
      // console.log(ratesArr)
    });
  }

  constructor(private service: RequestService) {
    let baseCurrency = "EUR";

    this.service.getCurrentData(baseCurrency).subscribe(data => {
      // console.log(data.rates);

      let ratesArr = new Array();
      for (let i = 0; i < Object.keys(data.rates).length; i++) {
        ratesArr.push({code: Object.keys(data.rates)[i], value: Object.values(data.rates)[i]})

        let amount = 500;
        // console.log(ratesArr[i].code, this.convert(amount, ratesArr[i].value))
      }

      // console.log(Object.keys(data.rates).length);
      // const N = APP_CONFIG.N,
      // getIndex = (number: any) => number - 1;
      const N = Object.keys(data.rates).length,
        getIndex = (number: any) => number - 1;
      // console.log(N);

      // this.nodes.push(new Node(SUPPORTED_CURRENCIES.indexOf(data.)));
      // this.nodes.push(new Node(baseCurrency));

      /** constructing the nodes array */
      for (let i = 0; i < Object.keys(data.rates).length; i++) {
        let amount = 500;
        this.nodes.push(new Node(this.convert(amount, ratesArr[i].value)));
        // console.log(ratesArr[i].value);
      }
      // for(let key of Object.keys(data.rates)) {
      //   this.nodes.push(new Node(key));
      //   console.log(key)
      // }

      for (let i = 1; i <= N; i++) {
        for (let m = 2; i * m <= N; m++) {
          /** increasing connections toll on connecting nodes */
          this.nodes[getIndex(i)].linkCount++;
          // console.log(i,this.nodes[getIndex(i)].linkCount++);
          this.nodes[getIndex(i * m)].linkCount++;

          /** connecting the nodes before starting the simulation */
          this.links.push(new Link(this.nodes[getIndex(i)], this.nodes[getIndex(i * m)]));

          // console.log(getIndex(i), this.nodes[getIndex(i)])
        }
      }
    });
  }

  convert(amount, next) {
    return (next * amount).toFixed(2);
  }
}
