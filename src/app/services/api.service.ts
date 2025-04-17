import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = 'ba42c8948a6246f78e7111038251304'; 
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) { }
  
  getWeatherData(query: string): Observable<any> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${query}&days=1&aqi=yes&alerts=no&dt=2025-04-16`;
    return this.http.get(url); 
  }
  
}
