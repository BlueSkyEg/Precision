import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'enviroments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

 private readonly _HttpClient: HttpClient = inject
 (HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/company`;
  getPendingTransactions(companyId: string, isSuspense: boolean =true): Observable<any> {
    // Construct the full URL with the path parameter
    const url = `${this.apiUrl}/suspense/get/${companyId}`;
    // Construct the query parameters
    const params = new HttpParams().set('isSuspense', isSuspense.toString());
    // Make the GET request
    return this._HttpClient.get<any>(url, { params });
  }
  getUpdatedTransactions(companyId: string, isSuspense: boolean = false): Observable<any> {
    // Construct the full URL with the path parameter
    const url = `${this.apiUrl}/suspense/get/${companyId}`;
    // Construct the query parameters
    const params = new HttpParams().set('isSuspense', isSuspense.toString());
    // Make the GET request
    return this._HttpClient.get<any>(url, { params });
  }
  // getYearlyReports(companyId: string ,yearsLength:number=5): Observable<any> {
  //   // Construct the full URL with the path parameter
  //   const url = `${this.apiUrl}/pl-years/${companyId}`;
  //   // Construct the query parameters
  //   let params = new HttpParams();
  //   if (yearsLength !== undefined) {
  //     params = params.set('year', yearsLength.toString());
  //   }
  //   // Make the GET request
  //   return this._HttpClient.get<any>(url, { params });
  // }
}
