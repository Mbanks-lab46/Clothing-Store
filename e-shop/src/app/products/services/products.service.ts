import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { ProductTypes } from '../product-types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public apiUrl = environment.apiUrl + '/products';
  private _products: ProductTypes[] = [];
  constructor(private _http: HttpClient) {}

  getProducts(): Observable<ProductTypes[]> {
    const opts = {
      headers: new HttpHeaders({ Authorization: 'myToken'})
    };
    return this._http.get<ProductTypes[]>(`${this.apiUrl}`, opts).pipe(map(
      (p) => { this._products = p
         return p;
        }
    ));
  }

  addProduct(newProduct: Partial<ProductTypes>): Observable<ProductTypes> {
    return this._http.post<ProductTypes>(`${this.apiUrl}`, newProduct).pipe(map(product => {
      this._products.push(product);
      return product;
    }));
  }

  deleteProduct(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const index = this._products.findIndex((p) => p.id === id);
        this._products.splice(index, 1);
      })
    );
  }
}
