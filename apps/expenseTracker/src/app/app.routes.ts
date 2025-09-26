import { Route } from '@angular/router';
import { authRoutes } from './layout/auth.routes';
import { dashboardRoutes } from './layout/dashboard.routes';
import { dashboardAuthGuard } from './common/guards/dashboard-auth/dashboard-auth.guard';
import { AppNavigation } from './common/constants/app-navigation.constants';

export const appRoutes: Route[] = [
  {
    path: AppNavigation.dashboard,
    loadComponent: () =>
      import('./layout/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    children: [...dashboardRoutes],
    canActivate: [dashboardAuthGuard],
  },
  {
    path: AppNavigation.auth,
    loadComponent: () =>
      import('./layout/auth/auth.component').then((c) => c.AuthComponent),
    children: [...authRoutes],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/' + AppNavigation.dashboard + '/' + AppNavigation.home,
  },
];
