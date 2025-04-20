import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  weatherData: any = {};
  city: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  today: Date = new Date();

  
  constructor(private api: ApiService) {}
  
  ngOnInit(): void {
    this.getLocation();
  }
 
  getLocation() {
    this.isLoading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const coordinates = `${lat},${lon}`;
        this.getWeather(coordinates);
      }, error => {
        console.warn('Geolocation permission denied. Using default city.');
        this.getWeather('Kochi');
      });
    } else {
      console.log("Geolocation not supported.");
      this.getWeather('Kochi');
    }
  }
  
  searchWeather() {
    if (!this.city.trim()) {
      alert("Please enter a city name");
      return;
    }
    
    console.log("Searching for city:", this.city); 
    this.getWeather(this.city);
  }
  
 
getWeather(query: string) {
  this.isLoading = true;
  this.errorMessage = '';
 
  this.api.getWeatherData(query).subscribe({
    next: (data) => {
      this.weatherData = data;
      console.log('Weather data loaded:', data);
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = "Weather fetch failed! Please check the city name and try again.";
      console.error('API error:', err);
      this.isLoading = false;
    }
  });
}

getUvRange(uv: number): string {
  if (uv === undefined || uv === null) return '';
  if (uv < 3) return 'Low';
  else if (uv < 6) return 'Moderate';
  else if (uv < 8) return 'High';
  else if (uv < 11) return 'Very High';
  else return 'Extreme';
}


}