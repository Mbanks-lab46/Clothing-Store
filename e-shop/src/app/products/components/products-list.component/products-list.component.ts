import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { map, Observable, BehaviorSubject, combineLatest} from 'rxjs';
import { ProductTypes } from '../../product-types';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { AddProductComponent } from '../add-product.component/add-product.component';
import { Paginator } from "../paginator/paginator";
type SortMode = 'low' | 'high';
type Category = "men's clothing" | "women's clothing" | "electronics" | "jewelery";
declare const bootstrap: any;

@Component({
  selector: 'products-list',
  imports: [AsyncPipe, CurrencyPipe, AddProductComponent, Paginator],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  products$ = new Observable<ProductTypes[]>();
  viewProducts$ = new Observable<ProductTypes[]>();

  private sortSubject = new BehaviorSubject<SortMode>('low');
  sort$ = this.sortSubject.asObservable();

  private categoriesSubject = new BehaviorSubject<Set<Category>>(new Set());
  categories$ = this.categoriesSubject.asObservable();

  private addModal: any;
  private addedProductsSubject = new BehaviorSubject<ProductTypes[]>([]);
  addedProducts$ = this.addedProductsSubject.asObservable();

  pagedProducts: ProductTypes[] = [];

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this._productsService.getProduct();

    this.viewProducts$ = combineLatest([
      this.products$,
      this.addedProducts$,
      this.sort$,
      this.categories$,
    ]).pipe(
      map(([products, added, sort, selectedCatgories]) => {
        const merged = [...added, ...products];
        const filtered =
          selectedCatgories.size === 0
            ? merged
            : merged.filter((p) => selectedCatgories.has(p.category as Category));

        const copy = [...filtered];
        copy.sort((a, b) => (sort === 'low' ? a.price - b.price : b.price - a.price));
        return copy;
      }),
    );
  }

  ngAfterViewInit(): void {
    const el = document.getElementById('addProductModal');
    this.addModal = new bootstrap.Modal(el);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as SortMode;
    this.sortSubject.next(value);
  }

  onCategoryToggle(event: Event) {
    const element = event.target as HTMLInputElement;
    const category = element.value as Category;
    const nxt = new Set(this.categoriesSubject.value);
    element.checked ? nxt.add(category) : nxt.delete(category);
    this.categoriesSubject.next(nxt);
  }

  openAddModal() {
    this.addModal?.show();
  }

  closeAddModal() {
    this.addModal?.hide();
  }

  handleProductAdded(product: ProductTypes) {
    this._productsService.addProduct(product).subscribe((add) => {
      this.addedProductsSubject.next([add, ...this.addedProductsSubject.value]);
      this.closeAddModal();
    });
  }
}
