import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideTranslateService(),
        {
          provide: AuthService,
          useValue: {
            login: () =>
              of({
                token: 't',
                message: 'ok',
                user: { id: '1', name: 'U', email: 'u@e.com' },
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark controls as touched on invalid submit', () => {
    component.loginForm().reset();
    const spy = jest.spyOn(component.loginForm(), 'markAllAsTouched');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate on successful login', () => {
    const router = TestBed.inject(Router) as unknown as { navigate: jest.Mock };
    jest.spyOn(router, 'navigate');
    component.loginForm().setValue({ email: 'a@b.com', password: 'x' });
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalled();
  });
});
