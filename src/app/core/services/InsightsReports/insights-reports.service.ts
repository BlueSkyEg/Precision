import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsightsReportsService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/insights/reports`;
  getMonthlyReports(companyId: string, year: number = 2024): Observable<any> {
    // Construct the full URL with the path parameter
    const url = `${this.apiUrl}/pl-year/${companyId}`;

    // Construct the query parameters
    let params = new HttpParams();
    if (year !== undefined) {
      params = params.set('year', year.toString());
    }

    // Make the GET request
    return this._HttpClient.get<any>(url, { params });
  }
  getYearlyReports(companyId: string, yearsLength: number = 5): Observable<any> {
    // Construct the full URL with the path parameter
    const url = `${this.apiUrl}/pl-years/${companyId}`;
    // Construct the query parameters
    let params = new HttpParams();
    if (yearsLength !== undefined) {
      params = params.set('year', yearsLength.toString());
    }
    // Make the GET request
    return this._HttpClient.get<any>(url, { params });
  }
  getYearlyPsReports(companyId: string, yearsLength: number = 5): Observable<any> {
    // Construct the full URL with the path parameter
    const url = `${this.apiUrl}/bs-years/${companyId}`;
    // Construct the query parameters
    let params = new HttpParams();
    if (yearsLength !== undefined) {
      params = params.set('year', yearsLength.toString());
    }
    // Make the GET request
    return this._HttpClient.get<any>(url, { params });
  }

}
