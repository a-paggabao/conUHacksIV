import { Node } from './';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node | any;
  target: Node | any;

  constructor(source: Node | any, target: Node | any) {
    this.source = source;
    this.target = target;
  }
}
