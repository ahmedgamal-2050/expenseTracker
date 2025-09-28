import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  CurrencyApiConstants,
  CurrencyApiResponse,
} from '../../constants/currency-api.constants';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';

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
    return of(CurrencyApiResponse);
    //return this.http.get(apiUrl);
  }

  convertCurrency(amount: number, currencyValue: number) {
    return amount * currencyValue;
  }
}
