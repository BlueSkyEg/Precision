import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ILoginData } from 'app/shared/interfaces/auth/login-form.interface';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'
import { Router } from '@angular/router';
import { DropdownStateService } from '../dropdown-state/dropdown-state.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly _DropdownStateService: DropdownStateService =inject(DropdownStateService);
  private readonly _Router: Router = inject(Router);
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private platformId = inject(PLATFORM_ID);
  Login(data: ILoginData): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this._HttpClient.post(url, data);
  }
  saveUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken') !== null) {
        const token: any = localStorage.getItem('userToken');
        console.log(jwtDecode(token));
        return jwtDecode(token);
      }
    }
  }
  Logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userToken');
      this._DropdownStateService.resetSelectedBusiness();
      this._Router.navigate(['/login']);
    }
  }
}
