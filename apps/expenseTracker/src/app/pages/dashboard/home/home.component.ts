import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { AppStorage } from '../../../common/constants/app-storage.constants';
import { CategoryOptionPipe } from '../../../common/pipes/category-option/category-option.pipe';
import { DatePipe } from '@angular/common';
import { Expense } from '../expenses/expenses.model';
import { User } from '../../../common/models/user.model';
import { CurrencyService } from '../../../common/services/currency/currency.service';
import { DefaultCurrency } from '../../../common/constants/currency-api.constants';
import { CurrencyConversionPipe } from '../../../common/pipes/currency-conversion/currency-conversion.pipe';
import { ExpensesService } from '../../../common/services/expenses/expenses.service';
import { ApiArrayResponse, Meta } from '../../../common/models/api-array.model';

@Component({
  selector: 'app-home',
  imports: [
    LucideAngularModule,
    CategoryOptionPipe,
    DatePipe,
    CurrencyConversionPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private expensesService = inject(ExpensesService);
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
  reloadIcon = icons.RotateCcw;

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
      this.periodOptions.find((period) => period.key === this.selectedPeriod())
        ?.label ?? 'This month'
  );

  expenses = signal<Expense[]>([]);
  filteredExpenses = signal<Expense[]>([]);
  meta = signal<Meta>({
    total: 0,
    page: 1,
    limit: 10,
  });
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

  totalIncome = signal<number>(0);
  totalExpenses = computed(() =>
    this.filteredExpenses().reduce(
      (sum, expense) => sum + (Number(expense.amount) || 0),
      0
    )
  );
  totalBalance = computed(() => this.totalIncome() - this.totalExpenses());

  toggleFilter() {
    this.filterOpen.set(!this.filterOpen());
  }

  selectPeriod(key: (typeof this.periodOptions)[number]['key']) {
    this.selectedPeriod.set(key);
    this.getExpensesByPeriod();
    this.filterOpen.set(false);
  }

  ngOnInit(): void {
    this.getCurrency();
    this.getExpenses();
  }

  getCurrency() {
    this.currencyService.getCurrency().subscribe((currency) => {
      this.currencyValue.set(currency.data[DefaultCurrency].value);
    });
  }

  getExpenses(page = 1) {
    this.expensesService
      .getExpenses(1, this.meta().limit * page)
      .subscribe((response: ApiArrayResponse<Expense>) => {
        const { data, meta } = response;
        this.expenses.set(data);
        this.selectedPeriod.set('this_month');
        this.getExpensesByPeriod();
        this.meta.set(meta);
      });
  }

  getExpensesByPeriod() {
    const { start, end } = this.getPeriodRange(this.selectedPeriod());
    this.filteredExpenses.set(
      this.expenses().filter((expense) => {
        if (!expense?.date) return false;
        const todayDate = new Date(expense.date);
        return todayDate >= start && todayDate <= end;
      })
    );
  }
}
