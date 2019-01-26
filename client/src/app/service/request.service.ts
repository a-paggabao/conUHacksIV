import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  @Input() start_date: string;
  @Input() base_currency: string;
  constructor(private http: HttpClient) {
  }
  getData() {
    return this.http.get(
      'https://api.exchangeratesapi.io/history?start_at='+this.start_date+'&end_at=2018-09-01&base='+this.base_currency).subscribe(
        data => {
          console.log(data);
      })
  };
}
