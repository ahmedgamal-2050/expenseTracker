import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  CurrencyApiConstants,
  CurrencyApiResponse,
} from '../../constants/currency-api.constants';
import { environment } from '../../../../environments/environment';
import { CurrencyResponse } from '../../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private http = inject(HttpClient);
  currencyList = signal<string[]>(Object.keys(CurrencyApiResponse.data));

  getCurrency() {
    const apiUrl = CurrencyApiConstants.apiUrl.replace(
      '{apiKey}',
      environment.apiKey
    );
    return this.http.get<CurrencyResponse>(apiUrl);
  }

  convertCurrency(amount: number, currencyValue: number) {
    return amount * currencyValue;
  }
}
