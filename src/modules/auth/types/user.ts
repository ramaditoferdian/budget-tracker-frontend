import { Category, Source, Transaction, TransactionType } from "@/types";

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;

  transactions: Transaction[];
  categories: Category[];
  sources: Source[];
  transactionTypes: TransactionType[];
}
