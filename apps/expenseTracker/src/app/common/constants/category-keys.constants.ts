import { icons } from 'lucide-angular';

export const CategoryOptions = {
  groceries: {
    style: 'bg-slate-200 text-blue-700',
    icon: icons.ShoppingCart,
    label: 'Groceries',
  },
  entertainment: {
    style: 'bg-orange-200 text-orange-600',
    icon: icons.Clapperboard,
    label: 'Entertainment',
  },
  gas: {
    style: 'bg-red-100 text-rose-400',
    icon: icons.Fuel,
    label: 'Gas',
  },
  shopping: {
    style: 'bg-amber-100 text-amber-500',
    icon: icons.ShoppingBag,
    label: 'Shopping',
  },
  newspaper: {
    style: 'bg-red-50 text-orange-400',
    icon: icons.Newspaper,
    label: 'Newspaper',
  },
  transport: {
    style: 'bg-violet-200 text-blue-700',
    icon: icons.Car,
    label: 'Transport',
  },
  rent: {
    style: 'bg-red-100 text-orange-500',
    icon: icons.Building,
    label: 'Rent',
  },
};
