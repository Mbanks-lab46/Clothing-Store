import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  
  constructor(private _http: HttpClient) {

  }

  login(username: string, password: string): Observable<string> {
    return this._http.post<string>(`${this.apiUrl}/auth/login`, {username, password});
  }
}
