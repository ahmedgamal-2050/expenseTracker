import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import { AppStorage } from './common/constants/app-storage.constants';

const DEFAULT_LANGUAGE = 'en';

export function preloadTranslation(translate: TranslateService) {
  return function () {
    const savedLang =
      localStorage.getItem(AppStorage.language) ?? DEFAULT_LANGUAGE;
    translate.use(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
      defaultLanguage: 'en',
    }),
    provideAppInitializer(() => {
      const initializerFn = preloadTranslation(inject(TranslateService));
      return initializerFn();
    }),
  ],
};
