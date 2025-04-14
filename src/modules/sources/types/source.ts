import { Transaction, User } from "@/types";

export interface Source {
  id: string;
  name: string;
  accountNumber?: string;
  initialAmount?: number;
  balance: number;

  userId?: string;
  user?: User;

  transactions: Transaction[];         // asal dana
  receivedTransactions: Transaction[]; // transfer masuk
}
