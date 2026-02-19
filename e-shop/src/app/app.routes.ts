import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/components/products-list.component/products-list.component';
import { SignInComponent } from './header/login/sign-in.component/sign-in.component';

export const routes: Routes = [
    {
        path: '', component: SignInComponent,
    },
    {
        path: 'products',
        loadComponent: (() => import(
            './products/components/products-list.component/products-list.component'
        ).then(m => m.ProductsListComponent))

    }
];
