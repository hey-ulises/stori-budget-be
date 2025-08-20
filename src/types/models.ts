export interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
}

export interface Transaction {
  id: number;
  date: Date;
  amount: number;
  description?: string | null;
  categoryId: number;
}

export interface CategoryWithTransactions extends Category {
  transactions: Transaction[];
}

export interface TransactionWithCategory extends Transaction {
  category: Category;
}