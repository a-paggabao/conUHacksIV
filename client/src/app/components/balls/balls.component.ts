import { Component, OnInit } from "@angular/core";
import APP_CONFIG from "../../app.config";
import { Injectable } from "@angular/core";
import { Node, Link } from "../../d3";
import { HttpClient } from "@angular/common/http";
import { RequestService } from "src/app/service/request.service";
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: "app-balls",
  templateUrl: "./balls.component.html",
  styleUrls: ["./balls.component.scss"]
})
@Injectable({ providedIn: "root" })
export class BallsComponent implements OnInit {
  public theNodes = [];
  public theLinks = [];
  ngOnInit() {
  }
  constructor(private service: RequestService) {
    let keys: any[] = [];
    let nodes: Node[] = [];
    let links: Link[] = [];
    let masterData: any[]=[];
    let baseCurrency = "EUR";
    
    this.service.getCurrentData(baseCurrency).subscribe(data => {
      console.log(data);
   
      const N = APP_CONFIG.N,
        getIndex = (number: any) => number - 1;

      for(let key in data.rates){
        keys.push(key);
        // console.log(data["rates"].key.toString());
        nodes.push(new Node(data.rates.key));
      }
      
      /** constructing the nodes array */
      // for (let i = 1; i <= 33; i++) {
      //   nodes.push(new Node(data[i].toString()));
      //   console.log("2");
      // }
      console.log(nodes);

      for (let i = 1; i <= 33; i++) {
        for (let m = 2; i * m <= 33; m++) {
          /** increasing connections toll on connecting nodes */
          nodes[i].linkCount++;
          nodes[i * m].linkCount++;

          /** connecting the nodes before starting the simulation */
          links.push(new Link(i, i * m));
        }
      }
    });

    this.theNodes = nodes;
    this.theLinks = links;
  }
}
