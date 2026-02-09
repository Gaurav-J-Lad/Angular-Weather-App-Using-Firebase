import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../core/loading.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  // Firebase auth instance
  auth = inject(Auth);

  // Used to check browser vs server (SSR safe)
  platformId = inject(PLATFORM_ID);

  // Global loading service
  loadingService = inject(LoadingService);

  // Observable used in HTML to show/hide loader
  loading$ = this.loadingService.loading$;

  // Error message shown in UI
  errorMessage = '';

  // Reactive form for signup
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {
    // Run auth listener only in browser (not on server)
    if (isPlatformBrowser(this.platformId)) {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          // User is logged in
          console.log('Current logged-in UID:', user.uid);
          console.log('Email:', user.email);
        } else {
          // User is logged out
          console.log('User is signed out');
        }
      });
    }
  }

  async signup() {
    // Stop if form is invalid
    if (this.signupForm.invalid) return;

    // Extra safety for SSR
    if (!isPlatformBrowser(this.platformId)) return;

    // Get form values
    const email = this.signupForm.value.email!;
    const password = this.signupForm.value.password!;

    try {
      // Clear old error and start loader
      this.errorMessage = '';
      this.loadingService.show();

      // Create user in Firebase
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);

      // Account created successfully
      alert('Account created successfully!');
    } catch (err: any) {
      // Handle Firebase errors
      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Account already exists';
      } else if (err.code === 'auth/weak-password') {
        this.errorMessage = 'Password is too weak';
      } else {
        this.errorMessage = 'Something went wrong';
      }
    } finally {
      // Stop loader in all cases
      this.loadingService.hide();
    }
  }
}
