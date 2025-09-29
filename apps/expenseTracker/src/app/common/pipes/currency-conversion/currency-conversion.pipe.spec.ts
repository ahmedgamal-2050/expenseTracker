import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyConversionPipe } from './currency-conversion.pipe';

describe('CurrencyConversionPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
  });

  it('create an instance', () => {
    const pipe = TestBed.runInInjectionContext(
      () => new CurrencyConversionPipe()
    );
    expect(pipe).toBeTruthy();
  });

  it('should convert values using currency service', () => {
    const pipe = TestBed.runInInjectionContext(
      () => new CurrencyConversionPipe()
    );
    const result = pipe.transform(100, 2);
    expect(result).toBe('200.00');
  });
});
