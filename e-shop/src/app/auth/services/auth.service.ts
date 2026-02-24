import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private _accessToken = signal('');
  isLoggedIn = computed(() => this._accessToken() !== '');
  
  constructor(private _http: HttpClient) {

  }

  login(username: string, password: string): Observable<string> {
    return this._http.post<{ token?: string }>(`${this.apiUrl}/auth/login`, {username, password}).pipe(
      map(res => res.token ?? ''),
      tap(
        token => this._accessToken.set(token) 
      ));
    }

  logout() {
    this._accessToken.set('');
  }
}
