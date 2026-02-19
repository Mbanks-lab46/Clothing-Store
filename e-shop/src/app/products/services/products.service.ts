import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductTypes } from '../product-types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl: string = environment.apiUrl;
  constructor(private _http: HttpClient) {

  }

  getProduct(): Observable<ProductTypes[]> {
    return this._http.get<ProductTypes[]>(`${this.apiUrl}/products`);
  }
}
