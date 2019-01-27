import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  @Input() startDate: string;
  @Input() baseCurrency: string;
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  constructor(private http: HttpClient) {
  }
  getData(): Observable<any> {
    return this.http.get(
      'https://api.exchangeratesapi.io/history?start_at='+this.startDate+'&end_at='+this.todayDate+'&base='+this.baseCurrency);
  };
}
