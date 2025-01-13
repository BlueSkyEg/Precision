import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/insights/docs/qb`;

  getDocuments(companyId: string, query?: string): Observable<any> {
    let url = `${this.apiUrl}/${companyId}`;
    let params = new HttpParams();
    if (query) {
      params = params.set('path', query);
    }
    return this._HttpClient.get(url, { params });
  }
}
