import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const token: any =isPlatformBrowser(platformId)?localStorage.getItem('userToken'):'';

  if (token) return true;
  else {
    _Router.navigate(['/login']);
    return false;
  }

};
