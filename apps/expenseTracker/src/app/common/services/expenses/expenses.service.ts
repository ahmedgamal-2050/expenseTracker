import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../constants/endpoints.constants';
import { Expense } from '../../../pages/dashboard/expenses/expenses.model';
import { ApiArrayResponse } from '../../models/api-array.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private http = inject(HttpClient);

  getExpenses(page = 1, limit = 10): Observable<ApiArrayResponse<Expense>> {
    const url = Endpoints.dashboard.expenses.get;
    return this.http.get<Expense[]>(url).pipe(
      map((response) => {
        return {
          data: response
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice((page - 1) * limit, page * limit),
          meta: {
            total: response.length,
            page: page,
            limit: limit,
          },
        };
      })
    );
  }

  addExpenses(data: Expense) {
    const url = Endpoints.dashboard.expenses.add;
    return this.http.post<Expense>(url, data);
  }
}
