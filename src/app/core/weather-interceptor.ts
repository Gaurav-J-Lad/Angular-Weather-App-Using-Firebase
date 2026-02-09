import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from './loading.service';
import { environment } from '../../environments/environments';

export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // show loader
  loadingService.show();

  // attach API key
  const modifiedReq = req.clone({
    setParams: {
      appid: environment.weatherApiKey,
    },
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong';

      if (error.status === 401) {
        message = 'Invalid API key';
      } else if (error.status === 404) {
        message = 'City not found';
      }

      return throwError(() => message);
    }),
    finalize(() => loadingService.hide()),
  );
};
