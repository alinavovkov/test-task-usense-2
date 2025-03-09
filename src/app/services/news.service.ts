import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/top-headlines';
  private apiKey = '001d218862d54d448ce94e0ed0158b80';
  
  constructor(private http: HttpClient) { }

  getNews(country: string = 'us'): Observable<any> {
    return this.http
      .get(`${this.apiUrl}?country=${country}&apiKey=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Failed to fetch news. Try again later.'));
  }
}
