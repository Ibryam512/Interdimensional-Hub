import { ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';

const loaderInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true };

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), 
    loaderInterceptorProvider
  ]
};
