import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { map, Observable, of } from 'rxjs';
import { ProductTypes } from '../../product-types';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'products-list',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit{
  products$ = new Observable<ProductTypes[]>;

  constructor(private _productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.products$ = this._productsService.getProduct();

    this.products$.subscribe((res) => {
      console.log('res: ', res);
    })
  }

}
