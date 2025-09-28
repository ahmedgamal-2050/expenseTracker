import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';

@Pipe({
  name: 'currencyConversion',
})
export class CurrencyConversionPipe implements PipeTransform {
  private currencyService = inject(CurrencyService);

  transform(value: number, currencyValue = 1): string {
    if (!value || !currencyValue) return '0.00';

    const convertedValue = this.currencyService.convertCurrency(
      value,
      currencyValue
    );
    return convertedValue.toFixed(2);
  }
}
