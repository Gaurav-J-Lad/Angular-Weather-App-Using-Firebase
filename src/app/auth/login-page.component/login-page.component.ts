import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../core/loading.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  // Inject Firebase Auth instance
  auth = inject(Auth);

  router = inject(Router);

  loadingService = inject(LoadingService);
  private platformId = inject(PLATFORM_ID);

  errorMessage = '';
  // Reactive form for Login
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [Validators.required]),
  });

  // Expose loader observable for template usage
  loading$ = this.loadingService.loading$;

  // Login handler
  async login() {
    // Stop execution if form is invalid
    if (this.loginForm.invalid) {
      // Mark all fields touched to show validation errors
      this.loginForm.markAllAsTouched();
      return;
    }
    // SSR guard: only run in browser
    if (!isPlatformBrowser(this.platformId)) return;
    // Get values from the login form
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    try {
      this.errorMessage = '';

      // Show global loader
      this.loadingService.show();

      // Firebase login call
      const credentials = await signInWithEmailAndPassword(this.auth, email!, password!);

      // Successful login
      console.log('Logged in user:', credentials.user.email);

      // Navigate to todos page
      this.router.navigate(['/weather']);
    } catch (error: any) {
      // Log Firebase error code
      console.error(error.code);

      // Handle common auth errors
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Incorrect password';
      } else {
        this.errorMessage = 'Login failed. Please try again';
      }
    } finally {
      // Hide loader in all cases (success or error)
      this.loadingService.hide();
    }
  }
}
