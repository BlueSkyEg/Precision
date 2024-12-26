import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBusinesses } from 'app/shared/interfaces/insights/ibusinesses';
import { environment } from 'enviroments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DropdownStateService {
  private selectedBusinessSubject = new BehaviorSubject<IBusinesses | null>(null);
  private readonly _HttpClient: HttpClient = inject(HttpClient);

  selectedBusiness$ = this.selectedBusinessSubject.asObservable();

  private readonly apiUrl = `${environment.apiUrl}/company`;

  setSelectedBusiness(business: IBusinesses | null): void {
    this.selectedBusinessSubject.next(business);
  }

  getSelectedBusiness(): IBusinesses | null {
    return this.selectedBusinessSubject.value;
  }

  resetSelectedBusiness(): void {
    this.selectedBusinessSubject.next(null);
  }
  getYears(companyId: string): Observable<any> {
    // Construct the full URL with the path parameter
    const url = `${this.apiUrl}/years/${companyId}`
    return this._HttpClient.get<any>(url);
  }
}
