import { Component, DestroyRef, EventEmitter, inject, OnDestroy, OnInit, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductTypes } from '../../product-types';
import { ProductsService } from '../../services/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
type Category = "men's clothing" | "women's clothing" | "electronics" | "jewelery";

@Component({
  selector: 'add-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  cancel = output();
  submitProduct = output<ProductTypes>();
  addProductForm!: FormGroup;
  private _destroyRef = inject(DestroyRef);

  constructor(private _fb: FormBuilder, private _productsService: ProductsService){}

  ngOnInit(): void {
    this.addProductForm = this._fb.nonNullable.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ["men's clothing" as Category, Validators.required],
    });
  }

  submit() {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    const v = this.addProductForm.getRawValue();

    const DEFAULT_IMAGES: Record<Category, string> = {
      "men's clothing": 'images/men.jpg',
      "women's clothing": 'images/women.jpg',
      "electronics": 'images/electronics.jpg',
      "jewelery": 'images/jewelery.jpg'
    };

    const newProduct: ProductTypes = {
      id: Date.now(),
      title: v.title,
      price: v.price,
      category: v.category,
      image: DEFAULT_IMAGES[v.category as Category]
    };
    this.submitProduct.emit(newProduct);
    this._productsService.addProduct(newProduct).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe();
  }

  onCancel() {
    this.cancel.emit();
  }

}
