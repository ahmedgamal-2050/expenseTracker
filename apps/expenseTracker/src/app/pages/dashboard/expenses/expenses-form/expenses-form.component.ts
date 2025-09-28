import { Component, computed, inject, signal } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
import { AppNavigation } from '../../../../common/constants/app-navigation.constants';
import { AppStorage } from '../../../../common/constants/app-storage.constants';
import { CategoryStylePipe } from '../../../../common/pipes/category-style/category-style.pipe';
import { CategoryIconPipe } from '../../../../common/pipes/category-icon/category-icon.pipe';

@Component({
  selector: 'app-expenses-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    CategoryStylePipe,
    CategoryIconPipe,
  ],
  templateUrl: './expenses-form.component.html',
  styleUrl: './expenses-form.component.scss',
})
export class ExpensesFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private translate = inject(TranslateService);

  calendarIcon = icons.Calendar;
  imageIcon = icons.ImagePlus;
  chevronDown = icons.ChevronDown;

  categories = signal([
    {
      key: 'groceries',
      label: 'Groceries',
      isSelected: false,
    },
    {
      key: 'entertainment',
      label: 'Entertainment',
      isSelected: false,
    },
    { key: 'gas', label: 'Gas', isSelected: false },
    {
      key: 'shopping',
      label: 'Shopping',
      isSelected: false,
    },
    {
      key: 'newspaper',
      label: 'News Paper',
      isSelected: false,
    },
    {
      key: 'transport',
      label: 'Transport',
      isSelected: false,
    },
    { key: 'rent', label: 'Rent', isSelected: false },
  ]);
  plusIcon = icons.Plus;

  form: FormGroup = this.fb.group({
    category: new FormControl<string | null>(null, Validators.required),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.01),
    ]),
    date: new FormControl<string | null>(null, Validators.required),
    receipt: new FormControl<File | null>(null),
  });

  isSubmitDisabled = computed(() => this.form.invalid);

  onQuickCategorySelect(categoryElement: EventTarget | null) {
    const categoryKey = (categoryElement as HTMLSelectElement).value;
    if (!categoryKey || categoryKey === 'add') {
      // placeholder for add category flow
      return;
    }
    this.categories.update((categories) =>
      categories.map((c) => ({ ...c, isSelected: c.key === categoryKey }))
    );
    this.form.patchValue({ category: categoryKey });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.form.patchValue({ receipt: file });
  }

  onAddCategory() {
    console.log('add category');
  }

  submit() {
    console.log('🚀 ~ ExpensesFormComponent ~ submit ~ this.form:', this.form);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const expenses = JSON.parse(
      localStorage.getItem(AppStorage.expenses) ?? '[]'
    );
    expenses.push(this.form.value);
    localStorage.setItem(AppStorage.expenses, JSON.stringify(expenses));
    // Simulate save, then navigate back to expenses list
    this.router.navigate(['/' + AppNavigation.dashboard, AppNavigation.home]);
  }
}
