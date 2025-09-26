import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppNavigation } from '../../constants/app-navigation.constants';
import { AppStorage } from '../../constants/app-storage.constants';

export const dashboardAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isTokenPresent = !!localStorage.getItem(AppStorage.token);

  if (!isTokenPresent) {
    const queryParamArray = location.search.replace('?', '').split('=');
    const queryParamObject = { [queryParamArray[0]]: queryParamArray[1] };
    router.navigate([AppNavigation.auth, AppNavigation.login], {
      queryParams: {
        target: location.pathname,
        ...queryParamObject,
      },
    });
  }

  return isTokenPresent;
};
