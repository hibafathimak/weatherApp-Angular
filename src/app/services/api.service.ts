import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = environment.weatherApiKey;; 
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) { }
  
  getWeatherData(query: string): Observable<any> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${query}&days=1&aqi=yes&alerts=no`;
    return this.http.get(url); 
  }
  
}
