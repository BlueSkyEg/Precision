import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly _AuthService: AuthService = inject(AuthService);

  //admin  / Super User  / Accountant
  private readonly apiUrl01 = `${environment.apiUrl}/user/core`;

  //clients
  private readonly apiUrl02 = `${environment.apiUrl}/profile/core`;

  //get user Role
  get UserRole(): string {
    return this._AuthService.saveUserData().Role;
  }
  //get
  getuserById(Id: string): Observable<any> {
    if (this.UserRole != 'CLIENT') {
      return this._HttpClient.get<any>(`${this.apiUrl01}/get/${Id}`);
    }
    return this._HttpClient.get<any>(`${this.apiUrl02}/get/${Id}`);
  }

}
