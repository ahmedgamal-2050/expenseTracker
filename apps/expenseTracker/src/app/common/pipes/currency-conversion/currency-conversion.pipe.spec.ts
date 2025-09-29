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
});
