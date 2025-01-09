import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IApiResponse } from 'app/shared/interfaces/api-response-interface';
import { IAuthedUser } from 'app/shared/interfaces/auth/authed-user.interface';
import { ILoginData } from 'app/shared/interfaces/auth/login-form.interface';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  Login(data: ILoginData): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this._HttpClient.post(url, data);
  }
}
