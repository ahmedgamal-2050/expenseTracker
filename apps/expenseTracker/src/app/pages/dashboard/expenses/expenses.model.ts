export interface Expense {
  category: string;
  amount: number;
  date: string;
  receipt: string | null;
}

export interface Category {
  id: number;
  key: string;
  label: string;
  isSelected?: boolean;
}
