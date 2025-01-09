import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const _LoaderService: LoaderService = inject(LoaderService)
  _LoaderService.loaderSubject.next(true);

  return next(req).pipe(
    finalize(() => _LoaderService.loaderSubject.next(false))
  );
};
