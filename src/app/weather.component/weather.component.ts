import { Component, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Auth, signOut } from '@angular/fire/auth';
import { LoadingService } from '../core/loading.service';
import { WeatherService } from '../services/weather';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  city = '';
  weatherData: any;
  errorMessage = '';

  // services
  private weatherService = inject(WeatherService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private auth = inject(Auth);

  loading$ = this.loadingService.loading$;

  // Fetch weather (NO loader logic here)
  getWeather() {
    if (!this.city.trim()) {
      this.errorMessage = 'Please enter a city name';
      return;
    }

    this.errorMessage = '';

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: () => {
        this.errorMessage = 'City not found or API issue';
        this.weatherData = null;
      },
    });
  }

  // Logout (NOT HTTP → loader stays here)
  async logout() {
    try {
      this.loadingService.show();
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    } finally {
      this.loadingService.hide();
    }
  }
}
