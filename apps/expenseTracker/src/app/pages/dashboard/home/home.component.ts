import { Component, computed, signal } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { AppStorage } from '../../../common/constants/app-storage.constants';
import { CategoryStylePipe } from '../../../common/pipes/category-style/category-style.pipe';
import { DecimalPipe } from '@angular/common';
import { CategoryIconPipe } from '../../../common/pipes/category-icon/category-icon.pipe';
import { Expense } from '../expenses/expenses.model';
import { User } from '../../../common/models/user.model';

@Component({
  selector: 'app-home',
  imports: [
    LucideAngularModule,
    DecimalPipe,
    CategoryStylePipe,
    CategoryIconPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  caretDown = icons.ChevronDown;
  menuIcon = icons.Ellipsis;
  incomeIcon = icons.TrendingUp;
  expenseIcon = icons.TrendingDown;
  cartIcon = icons.ShoppingCart;
  musicIcon = icons.Music2;
  carIcon = icons.Car;

  month = signal<string>('This month');
  expenses = signal<Expense[]>(
    JSON.parse(localStorage.getItem(AppStorage.expenses) ?? '[]')
  );
  user = signal<User>(
    JSON.parse(localStorage.getItem(AppStorage.user) ?? '{}')
  );

  totalIncome = computed(() =>
    this.expenses().reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
  );
  totalExpenses = computed(() =>
    this.expenses().reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
  );
  totalBalance = computed(() => this.totalIncome() - this.totalExpenses());
  recent = computed(() => this.expenses().slice(-4).reverse());
}
