import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }
  getData() {
    return this.http.get(
      'https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01&base=USD').subscribe(
        data => {
          console.log(data);
      })
  };
}
