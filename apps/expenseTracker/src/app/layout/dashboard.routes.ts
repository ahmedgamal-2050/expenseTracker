import { Route } from '@angular/router';
import { AppNavigation } from '../common/constants/app-navigation.constants';

export const dashboardRoutes: Route[] = [
  {
    path: AppNavigation.home,
    pathMatch: 'full',
    redirectTo: AppNavigation.home,
  },
  {
    path: AppNavigation.home,
    loadComponent: () =>
      import('../pages/dashboard/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: AppNavigation.expenses,
    loadComponent: () =>
      import('../pages/dashboard/expenses/expenses.component').then(
        (c) => c.ExpensesComponent
      ),
  },
];
