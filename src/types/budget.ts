
export type Category = 
  | 'food' 
  | 'housing' 
  | 'transportation' 
  | 'entertainment' 
  | 'utilities' 
  | 'healthcare' 
  | 'other';

export interface CategoryDetails {
  name: Category;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Record<Category, CategoryDetails> = {
  food: {
    name: 'food',
    label: 'Food',
    icon: 'utensils',
    color: 'expense-food',
  },
  housing: {
    name: 'housing',
    label: 'Housing',
    icon: 'home',
    color: 'expense-housing',
  },
  transportation: {
    name: 'transportation',
    label: 'Transportation',
    icon: 'car',
    color: 'expense-transportation',
  },
  entertainment: {
    name: 'entertainment',
    label: 'Entertainment',
    icon: 'film',
    color: 'expense-entertainment',
  },
  utilities: {
    name: 'utilities',
    label: 'Utilities',
    icon: 'plug',
    color: 'expense-utilities',
  },
  healthcare: {
    name: 'healthcare',
    label: 'Healthcare',
    icon: 'heart',
    color: 'expense-healthcare',
  },
  other: {
    name: 'other',
    label: 'Other',
    icon: 'archive',
    color: 'expense-other',
  },
};

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: Date;
}

export interface Budget {
  category: Category;
  amount: number;
  spent: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}
