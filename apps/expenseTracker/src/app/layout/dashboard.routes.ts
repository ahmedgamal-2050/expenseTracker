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
    children: [
      {
        path: '',
        redirectTo: AppNavigation.add,
        pathMatch: 'full',
      },
      {
        path: '',
        loadComponent: () =>
          import('../pages/dashboard/expenses/expenses.component').then(
            (c) => c.ExpensesComponent
          ),
      },
      {
        path: AppNavigation.add,
        loadComponent: () =>
          import(
            '../pages/dashboard/expenses/expenses-form/expenses-form.component'
          ).then((c) => c.ExpensesFormComponent),
      },
    ],
  },
];
