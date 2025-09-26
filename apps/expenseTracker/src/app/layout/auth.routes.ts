import { Route } from '@angular/router';
import { AppNavigation } from '../common/constants/app-navigation.constants';

export const authRoutes: Route[] = [
  {
    path: AppNavigation.login,
    loadComponent() {
      return import('../pages/auth/login/login.component').then(
        (c) => c.LoginComponent
      );
    },
  },
];
