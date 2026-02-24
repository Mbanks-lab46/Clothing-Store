import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductTypes } from '../product-types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public apiUrl = environment.apiUrl;
  private _products: ProductTypes[] = [];
  constructor(private _http: HttpClient) {}

  getProduct(): Observable<ProductTypes[]> {
    const opts = {
      headers: new HttpHeaders({ Authorization: 'myToken'})
    };
    return this._http.get<ProductTypes[]>(`${this.apiUrl}/products`, opts);
  }

  addProduct(newProduct: Partial<ProductTypes>): Observable<ProductTypes> {
    return this._http.post<ProductTypes>(`${this.apiUrl}/products`, newProduct).pipe(map(product => {
      this._products.push(product);
      return product;
    }));
  }
}
