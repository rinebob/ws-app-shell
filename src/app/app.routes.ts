import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'counter',
    loadComponent: () => import('./counter/counter.component').then(m => m.CounterComponent)
  },
  {
    path: 'design-system',
    loadComponent: () => import('./design-system/design-system.component').then(m => m.DesignSystemComponent)
  },
  {
    path: 'tracker',
    loadComponent: () => import('./tracker/tracker.component').then(m => m.TrackerComponent)
  }
];
