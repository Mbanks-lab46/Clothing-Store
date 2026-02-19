import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './products/components/products-list.component/products-list.component';
import { SignInComponent } from "./header/login/sign-in.component/sign-in.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('e-shop');
}
