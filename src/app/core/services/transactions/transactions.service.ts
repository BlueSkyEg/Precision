import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly _HttpClient: HttpClient = inject
    (HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/insights/suspense`;

  //get
  getPendingTransactions(companyId: string, isSuspense: boolean = true): Observable<any> {
    // Construct the full URL with the path parameter
    const url = `${this.apiUrl}/get/${companyId}`;
    // Construct the query parameters
    const params = new HttpParams().set('isSuspense', isSuspense.toString());
    // Make the GET request
    return this._HttpClient.get<any>(url, { params });
  }
  getUpdatedTransactions(companyId: string, isSuspense: boolean = false): Observable<any> {
    // Construct the full URL with the path parameter
    const url = `${this.apiUrl}/get/${companyId}`;
    // Construct the query parameters
    const params = new HttpParams().set('isSuspense', isSuspense.toString());
    // Make the GET request
    return this._HttpClient.get<any>(url, { params });
  }
  //update
  updateSuspenseAccount(companyId: string|null, data: any): Observable<any> {
    const url = `${this.apiUrl}/update/${companyId}`;
    return this._HttpClient.post(url, data);
  }

  //Clear
  clearSuspenseAccount(companyId: string | null, data: any): Observable<any> {
    const url = `${this.apiUrl}/clear/${companyId}`;
    return this._HttpClient.post(url, data);
  }
  //History
  getHistoryByTransactionId(companyId: string|null, suspenseId:string): Observable<any> {
    const url = `${this.apiUrl}/log/${companyId}/${suspenseId}`;
    return this._HttpClient.get<any>(url);
  }
  getAllHistoryLogs(companyId: string | null): Observable<any> {
    const url = `${this.apiUrl}/log/${companyId}`;
    return this._HttpClient.get<any>(url);
  }
  getHistory(companyId: string | null, suspenseId: string): Observable<any> {
    const url = `${this.apiUrl}/log/${companyId}/history/${suspenseId}`;
    return this._HttpClient.get<any>(url);
  }
}
