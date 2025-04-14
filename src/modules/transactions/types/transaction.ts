import { Category, Source, TransactionType, User } from "@/types";

export interface Transaction {
  id: string;
  description?: string;
  date: string;
  amount: number;
  createdAt: string;

  userId: string;
  user?: User;

  typeId?: string;
  type?: TransactionType;

  sourceId?: string;
  source?: Source;

  targetSourceId?: string;
  targetSource?: Source;

  categoryId?: string;
  category?: Category;
}
