import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFormComponent } from './expenses-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { ExpensesService } from '../../../../common/services/expenses/expenses.service';
import { of } from 'rxjs';

describe('ExpensesFormComponent', () => {
  let component: ExpensesFormComponent;
  let fixture: ComponentFixture<ExpensesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFormComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideTranslateService(),
        {
          provide: ExpensesService,
          useValue: {
            addExpenses: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when required fields are empty', () => {
    component.form.reset();
    expect(component.form.invalid).toBe(true);
  });

  it('should mark controls as touched on invalid submit', () => {
    const spy = jest.spyOn(component.form, 'markAllAsTouched');
    component.submit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set category on quick select', () => {
    component.onQuickCategorySelect('groceries');
    expect(component.form.get('category')?.value).toBe('groceries');
  });

  it('should set receipt file on file select', () => {
    const file = new File(['data'], 'r.png', { type: 'image/png' });
    const input = document.createElement('input');
    const event = { target: { files: [file] } } as any;
    component.onFileSelected(event);
    expect(component.form.get('receipt')?.value).toBe(file);
  });

  it('should open date picker fallback to focus', () => {
    const input = document.createElement('input');
    const spy = jest.spyOn(input, 'focus');
    component.openDatePicker(input);
    expect(spy).toHaveBeenCalled();
  });

  it('should call addExpenses on submit when form valid', () => {
    const svc = TestBed.inject(ExpensesService);
    const spy = jest.spyOn(svc, 'addExpenses');
    component.form.setValue({
      category: 'groceries',
      amount: 10,
      date: '2025-09-01',
      receipt: null,
    });
    component.submit();
    expect(spy).toHaveBeenCalled();
  });
});
