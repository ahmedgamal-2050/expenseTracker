import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { dashboardAuthGuard } from './dashboard-auth.guard';
import { AppStorage } from '../../constants/app-storage.constants';

describe('dashboardAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => dashboardAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    });
    localStorage.clear();
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access when token exists', () => {
    localStorage.setItem(AppStorage.token, 'token');
    const result = executeGuard({} as any, {} as any);
    expect(result).toBe(true);
  });

  it('should redirect to auth/login when token missing', () => {
    const router = TestBed.inject(Router) as unknown as { navigate: jest.Mock };
    const result = executeGuard({} as any, {} as any);
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalled();
  });
});
