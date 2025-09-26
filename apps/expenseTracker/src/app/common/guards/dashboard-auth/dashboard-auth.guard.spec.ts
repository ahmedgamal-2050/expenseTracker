import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dashboardAuthGuard } from './dashboard-auth.guard';

describe('dashboardAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dashboardAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
