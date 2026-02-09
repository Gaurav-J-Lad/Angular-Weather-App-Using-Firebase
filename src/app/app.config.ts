import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { weatherInterceptor } from './core/weather-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([weatherInterceptor])),

    // Firebase App Initialization
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCWqUKFmuZaGCHmriTUwN31CFgS7kUQaws',
        authDomain: 'angular-to-do-list-ac61d.firebaseapp.com',
        projectId: 'angular-to-do-list-ac61d',
        storageBucket: 'angular-to-do-list-ac61d.firebasestorage.app',
        messagingSenderId: '403667491208',
        appId: '1:403667491208:web:ee78d6a06b11f2e184c23d',
        measurementId: 'G-11RV176HPY',
      }),
    ),

    // Firebase Auth
    provideAuth(() => getAuth()),

    // Firestore Database
    provideFirestore(() => getFirestore()),

    // Analytics (Browser only — SSR safe)
    provideAnalytics(() => {
      const platformId = inject(PLATFORM_ID);
      return isPlatformBrowser(platformId) ? getAnalytics() : null!;
    }),
  ],
};
