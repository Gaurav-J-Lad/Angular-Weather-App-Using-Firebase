import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
export const authGuard: CanActivateFn = () => {
  // Get Firebase Auth instance
  const auth = inject(Auth);

  // Used to redirect user if not logged in
  const router = inject(Router);

  // Guard must return true / false (or Promise<boolean>)
  return new Promise<boolean>((resolve) => {
    // Firebase listener to check login status
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in → allow route access
        resolve(true);
      } else {
        // User not logged in → redirect to login page
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};
