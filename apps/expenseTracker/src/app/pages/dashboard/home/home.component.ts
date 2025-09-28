import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { AppStorage } from '../../../common/constants/app-storage.constants';
import { CategoryStylePipe } from '../../../common/pipes/category-style/category-style.pipe';
import { DatePipe } from '@angular/common';
import { CategoryIconPipe } from '../../../common/pipes/category-icon/category-icon.pipe';
import { Expense } from '../expenses/expenses.model';
import { User } from '../../../common/models/user.model';
import { CurrencyService } from '../../../common/services/currency/currency.service';
import { DefaultCurrency } from '../../../common/constants/currency-api.constants';
import { CurrencyConversionPipe } from '../../../common/pipes/currency-conversion/currency-conversion.pipe';

@Component({
  selector: 'app-home',
  imports: [
    LucideAngularModule,
    CategoryStylePipe,
    CategoryIconPipe,
    DatePipe,
    CurrencyConversionPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private currencyService = inject(CurrencyService);

  currencyValue = signal<number>(1);
  defaultCurrency = signal<string>(DefaultCurrency);

  caretDown = icons.ChevronDown;
  caretUp = icons.ChevronUp;
  incomeIcon = icons.MoveDown;
  expenseIcon = icons.MoveUp;
  cartIcon = icons.ShoppingCart;
  musicIcon = icons.Music2;
  carIcon = icons.Car;

  filterOpen = signal<boolean>(false);
  periodOptions = [
    { key: 'this_month', label: 'This month' },
    { key: 'last_month', label: 'Last month' },
    { key: 'this_quarter', label: 'This quarter' },
    { key: 'last_quarter', label: 'Last quarter' },
    { key: 'this_year', label: 'This year' },
    { key: 'last_year', label: 'Last year' },
  ] as const;
  selectedPeriod =
    signal<(typeof this.periodOptions)[number]['key']>('this_month');
  month = computed(
    () =>
      this.periodOptions.find((p) => p.key === this.selectedPeriod())?.label ??
      'This month'
  );

  expenses = signal<Expense[]>(
    JSON.parse(localStorage.getItem(AppStorage.expenses) ?? '[]')
  );
  user = signal<User>(
    JSON.parse(localStorage.getItem(AppStorage.user) ?? '{}')
  );

  private getPeriodRange(period: (typeof this.periodOptions)[number]['key']): {
    start: Date;
    end: Date;
  } {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

    switch (period) {
      case 'this_month':
        return { start: startOfMonth, end: endOfMonth };
      case 'last_month': {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        return { start, end };
      }
      case 'this_quarter': {
        const q = Math.floor(month / 3);
        const start = new Date(year, q * 3, 1);
        const end = new Date(year, q * 3 + 3, 0, 23, 59, 59, 999);
        return { start, end };
      }
      case 'last_quarter': {
        let q = Math.floor(month / 3) - 1;
        let y = year;
        if (q < 0) {
          q = 3;
          y = year - 1;
        }
        const start = new Date(y, q * 3, 1);
        const end = new Date(y, q * 3 + 3, 0, 23, 59, 59, 999);
        return { start, end };
      }
      case 'this_year':
        return {
          start: new Date(year, 0, 1),
          end: new Date(year, 11, 31, 23, 59, 59, 999),
        };
      case 'last_year':
        return {
          start: new Date(year - 1, 0, 1),
          end: new Date(year - 1, 11, 31, 23, 59, 59, 999),
        };
    }
  }

  filteredExpenses = computed(() => {
    const { start, end } = this.getPeriodRange(this.selectedPeriod());
    return this.expenses().filter((e) => {
      if (!e?.date) return false;
      const d = new Date(e.date);
      return d >= start && d <= end;
    });
  });

  totalIncome = signal<number>(0);
  totalExpenses = computed(() =>
    this.filteredExpenses().reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
  );
  totalBalance = computed(() => this.totalIncome() - this.totalExpenses());

  recent = computed(() => this.filteredExpenses().slice(-4).reverse());

  toggleFilter() {
    this.filterOpen.set(!this.filterOpen());
  }

  selectPeriod(key: (typeof this.periodOptions)[number]['key']) {
    this.selectedPeriod.set(key);
    this.filterOpen.set(false);
  }

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency() {
    this.currencyService.getCurrency().subscribe((currency) => {
      this.currencyValue.set(currency.data[DefaultCurrency].value);
    });
  }
}
