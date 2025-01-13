import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const accountantGuard: CanActivateFn = (route, state) => {
  const _AuthService: AuthService = inject(AuthService);
  const _Router: Router = inject(Router);
  const userRole: string = _AuthService.saveUserData().Role;

  if (userRole && userRole !== 'ACCOUNTANT') return true;
  else {
    _Router.navigate(['/insights/dashboard/accountant-dashboard']);
    return false;
  }

};
