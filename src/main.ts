import localeAr from '@angular/common/locales/ar';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import { initDevUser } from './components/dev-user-init';
registerLocaleData(localeAr, 'ar');
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

initDevUser();
