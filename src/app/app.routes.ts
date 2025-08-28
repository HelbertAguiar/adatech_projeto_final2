// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@services/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent) },
  { path: 'product/:id', loadComponent: () => import('./pages/product-detail/product-detail.component').then(c => c.ProductDetailComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent) },
  { path: 'cart', canActivate: [authGuard], loadComponent: () => import('./pages/cart/cart.component').then(c => c.CartComponent) },
  { path: 'admin', canActivate: [authGuard], loadChildren: () => import('./pages/admin/admin.routes').then(r => r.ADMIN_ROUTES) },
  { path: '**', redirectTo: '' },
];
