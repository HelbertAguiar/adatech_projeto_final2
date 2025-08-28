import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { authGuard } from '../../core/services/auth.guard';

export const ADMIN_ROUTES: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    canActivate: [authGuard],
    data: { requiredRole: 'admin' }
  },
];
