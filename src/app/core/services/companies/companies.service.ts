import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/insights/company`;
  getCompanyList(clientId?: string): Observable<any> {
    let params = new HttpParams();
    if (clientId) {
      params = params.set('ClientId', clientId);
    }
    return this._HttpClient.get<any>(`${this.apiUrl}/list`, { params });
  }
}
