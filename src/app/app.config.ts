import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {OAuthService, provideOAuthClient, UrlHelperService } from 'angular-oauth2-oidc';
import { XhrInterceptorService } from './service/intercepter.service';



export const appConfig: ApplicationConfig = {
  providers: [provideOAuthClient(), UrlHelperService, OAuthService, provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptorService,
      multi: true,
    }, provideAnimationsAsync(),
  ],

 
};

