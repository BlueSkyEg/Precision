import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBusinesses } from 'app/shared/interfaces/insights/business-model';
import { environment } from 'environments/environment.development';
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

  getSelectedBusiness(): any | null {
    return this.selectedBusinessSubject.value;
  }
  isBusinessSelected(): boolean {
    return this.selectedBusinessSubject.value !== null;
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
