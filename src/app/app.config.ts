import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular-pro';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from '../../src/core/interceptors/request.interceptor';
import { responseInterceptor } from '../../src/core/interceptors/response.interceptor';
import { spinnerInterceptor } from '../core/interceptors/spinner.interceptor';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions()
    ),
    importProvidersFrom(
      SidebarModule, 
      DropdownModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateModule,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'ar'
      })
    ),
    IconSetService,
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        headerInterceptor,
        responseInterceptor,
        spinnerInterceptor,
      ])
    ),
  ],
};
