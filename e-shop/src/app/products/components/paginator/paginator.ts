import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator<T> {
  items = input<T[]>([]);
  pageSize = input<number>(10);
  pageItems = output<T[]>();
  page = signal(1);
  totalPages = computed(() => {
    const size = this.pageSize();
    const len = this.items().length;
    return Math.max(1, Math.ceil(len / size));
  });
  currentSlice = computed(() => {
    const items = this.items();
    const size = this.pageSize();
    const page = this.page();
    const start = (page - 1) * size;
    return items.slice(start, start + size);
  });

  constructor() {
   effect(() => {
     const tp = this.totalPages();
     if (this.page() > tp) this.page.set(tp);
     this.pageItems.emit(this.currentSlice());
   });
  }

  setPage(p: number) {
    const tp = this.totalPages();
    const clamped = Math.min(Math.max(1, p), tp);
    this.page.set(clamped);
  }

  prev() {
    this.setPage(this.page() - 1);
  }

  next() {
    this.setPage(this.page() + 1);
  }


}
