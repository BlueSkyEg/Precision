import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBusinesses } from 'app/shared/interfaces/insights/business-model';
import { environment } from 'environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DropdownStateService {
  private selectedBusinessSubject = new BehaviorSubject<IBusinesses | null>(
    null
  );
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  selectedBusiness$ = this.selectedBusinessSubject.asObservable();
  private readonly apiUrl = `${environment.apiUrl}/insights/company`;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedBusiness = this.getSavedBusiness();
      this.selectedBusinessSubject.next(savedBusiness);
    }
  }

  private saveBusinessToSessionStorage(business: IBusinesses | null): void {
    if (isPlatformBrowser(this.platformId)) {
      if (business) {
        sessionStorage.setItem('selectedBusiness', JSON.stringify(business));
      } else {
        sessionStorage.removeItem('selectedBusiness');
      }
    }
  }

  private getSavedBusiness(): IBusinesses | null {
    if (isPlatformBrowser(this.platformId)) {
      const business = sessionStorage.getItem('selectedBusiness');
      return business ? JSON.parse(business) : null;
    }
    return null;
  }

  setSelectedBusiness(business: IBusinesses | null): void {
    this.selectedBusinessSubject.next(business);
    this.saveBusinessToSessionStorage(business);
  }

  getSelectedBusiness(): any | null {
    return this.selectedBusinessSubject.value;
  }

  isBusinessSelected(): boolean {
    return this.selectedBusinessSubject.value !== null;
  }

  resetSelectedBusiness(): void {
    this.selectedBusinessSubject.next(null);
    this.saveBusinessToSessionStorage(null);
  }

  getYears(companyId: string): Observable<any> {
    const url = `${this.apiUrl}/years/${companyId}`;
    return this._HttpClient.get<any>(url);
  }
}
