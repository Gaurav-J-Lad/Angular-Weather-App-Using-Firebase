import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
export const publicGuard: CanActivateFn = () => {
  // Firebase Auth instance
  const auth = inject(Auth);

  // Router used for redirection
  const router = inject(Router);

  // Guard must return true or false
  return new Promise<boolean>((resolve) => {
    // Check current authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User already logged in → do NOT allow access to public pages
        // Redirect them to todos page
        router.navigate(['/weather']);
        resolve(false);
      } else {
        // User not logged in → allow access to public pages
        resolve(true);
      }
    });
  });
};
