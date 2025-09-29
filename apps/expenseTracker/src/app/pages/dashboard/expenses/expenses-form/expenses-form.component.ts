import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AppNavigation } from '../../../../common/constants/app-navigation.constants';
import { AppStorage } from '../../../../common/constants/app-storage.constants';
import { CategoryOptionPipe } from '../../../../common/pipes/category-option/category-option.pipe';
import { CategoryService } from '../../../../common/services/category/category.service';
import { Category } from '../expenses.model';
import { ExpensesService } from '../../../../common/services/expenses/expenses.service';
import { ToastComponent } from '../../../../common/components/toast/toast.component';

@Component({
  selector: 'app-expenses-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    CategoryOptionPipe,
    TranslatePipe,
    ToastComponent,
  ],
  templateUrl: './expenses-form.component.html',
  styleUrl: './expenses-form.component.scss',
})
export class ExpensesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  private expensesService = inject(ExpensesService);
  private translate = inject(TranslateService);

  calendarIcon = icons.Calendar;
  imageIcon = icons.ImagePlus;
  chevronDown = icons.ChevronDown;

  categories = signal<Category[]>([]);
  plusIcon = icons.Plus;

  form: FormGroup = this.fb.group({
    category: new FormControl<string>('', Validators.required),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.01),
    ]),
    date: new FormControl<string | null>(null, Validators.required),
    receipt: new FormControl<File | null>(null),
  });

  toast = signal<{ type: 'success' | 'error'; message: string }>({
    type: 'success',
    message: '',
  });

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories.set(
        categories.map((category) => ({ ...category, isSelected: false }))
      );
    });
  }

  onCategorySelect(categoryElement: EventTarget | null) {
    const categoryKey = (categoryElement as HTMLSelectElement).value;

    this.onQuickCategorySelect(categoryKey ?? '');
  }

  onQuickCategorySelect(categoryKey: string) {
    this.categories.update((categories) =>
      categories.map((category) => ({
        ...category,
        isSelected: category.key === categoryKey,
      }))
    );
    this.form.patchValue({ category: categoryKey });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.form.patchValue({ receipt: file });
  }

  openDatePicker(input: HTMLInputElement) {
    if (typeof input.showPicker === 'function') {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  handleAddCategory() {
    console.log('add category');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.set({
        type: 'error',
        message: this.translate.instant(
          'expenses_form_screen_please_fix_highlighted_fields'
        ),
      });
      return;
    }

    this.addExpenses();
  }

  addExpenses() {
    this.expensesService.addExpenses(this.form.value).subscribe(() => {
      const expenses = JSON.parse(
        localStorage.getItem(AppStorage.expenses) ?? '[]'
      );
      expenses.push(this.form.value);
      localStorage.setItem(AppStorage.expenses, JSON.stringify(expenses));

      this.router.navigate(['/' + AppNavigation.dashboard, AppNavigation.home]);
      this.toast.set({
        type: 'success',
        message: 'Expense saved successfully.',
      });
    });
  }
}
