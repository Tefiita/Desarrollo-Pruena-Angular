import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private constituentsUrl = 'assets/json-angular/constituyentes/constituensList.json';
  private summariesPath = 'assets/json-angular/resumen/';
  private historyPath = 'assets/json-angular/history/';

  constructor(private http: HttpClient) {}

  getConstituents(): Observable<any> {
    return this.http.get(this.constituentsUrl);
  }

  getSummary(codeInstrument: string): Observable<any> {
    return this.http.get(`${this.summariesPath}${codeInstrument}.json`);
  }

  getHistory(codeInstrument: string): Observable<any> {
    return this.http.get(`${this.historyPath}history-${codeInstrument}.json`);
  }

  getInstrumentData(codeInstrument: string): Observable<any> {
    return forkJoin({
      Summary: this.getSummary(codeInstrument),
      History: this.getHistory(codeInstrument),
    });
  }
}
