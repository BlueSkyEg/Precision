import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponse } from 'app/shared/interfaces/api-response-interface';
import { environment } from 'enviroments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}dashboard/`;

  getProfiles(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}profiles`);
  }
  getClients(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}clients`);
  }
  getbusinesses(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}businesses`);
  }
}
