// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent) },
//   { path: 'produto/:id', loadComponent: () => import('./pages/').then(c => c.ProductDetailComponent) },
//   { path: 'login', loadComponent: () => import('./pages/').then(c => c.Component) },
//   { path: 'carrinho', loadComponent: () => import('./pages/').then(c => c.Component) },
//   { path: 'admin', loadComponent: () => import('./pages/').then(c => c.Component) },
  { path: '**', redirectTo: '' },
];
