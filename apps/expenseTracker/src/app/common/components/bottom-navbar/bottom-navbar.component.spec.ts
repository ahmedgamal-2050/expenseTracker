import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BottomNavbarComponent } from './bottom-navbar.component';

describe('BottomNavbarComponent', () => {
  let component: BottomNavbarComponent;
  let fixture: ComponentFixture<BottomNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavbarComponent, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: TranslateService, useValue: { instant: (k: string) => k } },
        provideTranslateService(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
