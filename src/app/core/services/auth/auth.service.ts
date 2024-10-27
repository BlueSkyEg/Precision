import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IApiResponse } from 'app/shared/interfaces/api-response-interface';
import { IAuthedUser } from 'app/shared/interfaces/auth/authed-user.interface';
import { ILoginData } from 'app/shared/interfaces/auth/login-form.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly _Router: Router = inject(Router);
  Login(data: ILoginData): Observable<IApiResponse<IAuthedUser>> {
    return this._HttpClient.post<IApiResponse<IAuthedUser>>('http://10.1.1.83:5090/core/auth/login',data
    );
  }
}
