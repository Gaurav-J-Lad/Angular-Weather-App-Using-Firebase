import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    // No API key here – interceptor will attach it
    return this.http.get(`${this.apiUrl}?q=${city}&units=metric`);
  }
}
