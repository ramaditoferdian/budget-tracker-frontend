import { User, Transaction, TransactionType } from "@/types";

export interface Category {
  id: string;
  name: string;

  userId?: string;
  user?: User;

  transactions: Transaction[];

  transactionTypeId?: string;
  transactionType?: TransactionType;
}
