export interface CurrencyResponse {
  meta: {
    last_updated_at: string;
  };
  data: {
    [key: string]: Currency;
  };
}

export interface Currency {
  code: string;
  value: number;
}
