import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsightsCompanyService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/company`;

  private accountsDictionary: Record<string, string> = {};
  getAccounts(companyId: string): Observable<any> {
    const url = `${this.apiUrl}/accounts/get/${companyId}`;
    return this._HttpClient.get<any[]>(url).pipe(
      tap((response: any) => {
        const accounts = response?.data;
        if (Array.isArray(accounts)) {
          this.accountsDictionary = accounts.reduce((acc, account) => {
            acc[account.id] = account.fullName;
            return acc;
          }, {});
        } else {
          console.error('Accounts data is not an array:', accounts);
        }
      })
    );
  }


  getAccountNameById(accountId: string): string | undefined {
    return this.accountsDictionary[accountId];
  }
}

