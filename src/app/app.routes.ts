import { Routes } from '@angular/router';
import { publicGuard } from './guards/public-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // public routes (only when NOT logged in)
  {
    path: 'signup',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./auth/signup-page.component/signup-page.component').then(
        (c) => c.SignupPageComponent,
      ),
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./auth/login-page.component/login-page.component').then((c) => c.LoginPageComponent),
  },

  // protected route (only when logged in)
  {
    path: 'weather',
    canActivate: [authGuard],
    // component:WeatherComponent
    loadComponent: () =>
      import('./weather.component/weather.component').then((c) => c.WeatherComponent),
  },

  // fallback
  { path: '**', redirectTo: 'login' },
];
