import { User, Transaction, Category } from "@/types";

export interface TransactionType {
  id: string;
  name: string;

  userId?: string;
  user?: User;
  transactions: Transaction[];
  categories: Category[];
}
