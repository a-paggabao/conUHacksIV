import { Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { formatDate } from "@angular/common";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RequestService {
  @Input() baseCurrency: string;
  todayDate = formatDate(new Date(), "yyyy-MM-dd", "en");
  now = new Date();
  startDate = formatDate(
    new Date(this.now).setFullYear(this.now.getFullYear() - 5),
    "yyyy-MM-dd",
    "en"
  );
  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    return this.http.get(
      "https://api.exchangeratesapi.io/history?start_at=" +
        this.startDate +
        "&end_at=" +
        this.todayDate +
        "&base=" +
        this.baseCurrency
    );
  }

  getCurrentData(base: String): Observable<any> {
    return this.http
      .get(`https://api.exchangeratesapi.io/latest?base=${base}`)
  }
}
