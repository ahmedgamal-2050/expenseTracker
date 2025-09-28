import { inject, Injectable } from '@angular/core';
import { Category } from '../../../pages/dashboard/expenses/expenses.model';
import { Endpoints } from '../../constants/endpoints.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getCategories() {
    const url = Endpoints.dashboard.categories.get;
    return this.http.get<Category[]>(url);
  }

  addCategory(data: Category) {
    const url = Endpoints.dashboard.categories.add;
    return this.http.post<Category>(url, data);
  }
}
