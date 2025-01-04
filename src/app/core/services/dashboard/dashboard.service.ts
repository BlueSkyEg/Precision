import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/dashbords`;

  getProfiles(): Observable<any> {
    return this._HttpClient.get<any>(`${this.apiUrl}/profiles`);
  }
  getClients(): Observable<any> {
    // Make the GET request
    return this._HttpClient.get<any>(`${this.apiUrl}/clients`);
  }
  getbusinesses(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/businesses`);
  }
  getProfileById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/profiles/${id}`);
  }

  getClientById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/clients/${id}`);
  }
  getBusinessAnalysis(companyId: string, year: number = 2024): Observable<any> {
    const url = `${this.apiUrl}/business-analisys/${companyId}`;
    const params = new HttpParams().set('year', year.toString());
    return this._HttpClient.get<any>(url, { params });
  }
}
