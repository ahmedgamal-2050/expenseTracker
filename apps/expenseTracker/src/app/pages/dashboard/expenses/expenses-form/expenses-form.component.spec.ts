import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFormComponent } from './expenses-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

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
});
