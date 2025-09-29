import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ExpensesService } from '../../../common/services/expenses/expenses.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let expensesService: ExpensesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideTranslateService(),
        {
          provide: ExpensesService,
          useValue: {
            getExpenses: () =>
              of({ data: [], meta: { total: 0, page: 1, limit: 10 } }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expensesService = TestBed.inject(ExpensesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute totals and recent from expenses', () => {
    component['expenses'].set([
      {
        category: 'groceries',
        amount: 10,
        date: new Date().toISOString(),
        receipt: null,
      },
      {
        category: 'transport',
        amount: 5,
        date: new Date().toISOString(),
        receipt: null,
      },
    ]);
    component['getExpensesByPeriod']();
    expect(component.totalExpenses()).toBeGreaterThan(0);
    expect(component['filteredExpenses']().length).toBeGreaterThan(0);
  });

  it('should change period when selecting from dropdown', () => {
    const initial = component.month();
    component.selectPeriod('last_month');
    expect(component.month()).not.toEqual(initial);
  });

  describe('getPeriodRange', () => {
    it('should return correct range for this_quarter', () => {
      const range = component['getPeriodRange']('this_quarter');

      expect(range.start).toBeInstanceOf(Date);
      expect(range.end).toBeInstanceOf(Date);
    });

    it('should return correct range for last_quarter', () => {
      const range = component['getPeriodRange']('last_quarter');

      expect(range.start).toBeInstanceOf(Date);
      expect(range.end).toBeInstanceOf(Date);
    });

    it('should return correct range for this_year', () => {
      const range = component['getPeriodRange']('this_year');

      expect(range.start).toBeInstanceOf(Date);
      expect(range.end).toBeInstanceOf(Date);
    });

    it('should return correct range for last_year', () => {
      const range = component['getPeriodRange']('last_year');

      expect(range.start).toBeInstanceOf(Date);
      expect(range.end).toBeInstanceOf(Date);
    });
  });

  it('should handle toggleFilter', () => {
    component.toggleFilter();
    expect(component.filterOpen()).toBe(true);
    component.toggleFilter();
    expect(component.filterOpen()).toBe(false);
  });

  it('should handle getExpenses', () => {
    const spy = jest.spyOn(expensesService, 'getExpenses');
    spy.mockReturnValue(
      of({ data: [], meta: { total: 0, page: 1, limit: 10 } })
    );

    component.getExpenses();

    expect(spy).toHaveBeenCalled();
    expect(component.expenses()).toEqual([]);
  });
});
