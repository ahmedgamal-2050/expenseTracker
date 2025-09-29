import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TopNavbarComponent } from './top-navbar.component';
import { provideTranslateService } from '@ngx-translate/core';

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavbarComponent, RouterTestingModule.withRoutes([])],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle language between en and ar', () => {
    const initial = component.currentLanguage();

    component.toggleLanguage();

    const toggled = component.currentLanguage();

    expect(toggled).not.toEqual(initial);
  });

  it('should toggle theme between light and dark and persist', () => {
    const initialIsDark = component.isDarkTheme();
    component.toggleTheme();
    fixture.detectChanges();
    expect(component.isDarkTheme()).toBe(!initialIsDark);
  });

  it('should navigate to auth/login on logout', () => {
    const router = TestBed.inject(Router) as unknown as { navigate: jest.Mock };
    jest.spyOn(router, 'navigate');
    component.logout();
    expect(router.navigate).toHaveBeenCalled();
  });
});
