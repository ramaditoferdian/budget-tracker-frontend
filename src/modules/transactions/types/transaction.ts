export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  createdAt: string;
  userId: string;
  typeId: string;
  sourceId: string;
  targetSourceId: string | null;
  categoryId: string;

  type: {
    id: string;
    name: string;
    userId: string | null;
  };

  category: {
    id: string;
    name: string;
    userId: string | null;
    transactionTypeId: string;
  };

  source: {
    id: string;
    name: string;
    accountNumber: string | null;
    initialAmount: number;
    balance: number;
    userId: string;
  };

  targetSource: null | {
    id: string;
    name: string;
    accountNumber: string | null;
    initialAmount: number;
    balance: number;
    userId: string;
  };
}

export interface TransactionPagination {
  rowsCount: number;
  pageCount: number;
  currentPage: number;
  limit: number;
}

export interface TransactionListResponse {
  data: {
    transactions: Transaction[];
    pagination: TransactionPagination;
  };
  errors: boolean;
}

export interface TransactionQueryParams {
  sortBy?: 'createdAt' | 'amount' | 'updatedAt' | 'date';
  order?: "asc" | "desc";
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  typeId?: string;
  categoryId?: string;
  limit?: number; // (default = 10)
  page?: number; // (default = 1)
}

export interface TransactionPayload {
  description?: string;
  date?: string;
  amount?: number;
  typeId?: string;
  sourceId?: string;
  targetSourceId?: string | null;
  categoryId?: string;
}

export interface TransactionCalendarItem {
  date: string; // format: YYYY-MM-DD
  types: {
    [typeName: string]: number; // misal: { "pengeluaran": 20000, "transfer": 360000 }
  };
  netAmount: number;
}

export interface TransactionCalendarResponse {
  data: TransactionCalendarItem[];
  errors: boolean;
}

export interface TransactionSummary {
  month: string; // format YYYY-MM
  totalPemasukan: number;
  totalPengeluaran: number;
  totalTabungan: number;
  netAmount: number;
}

export interface TransactionSummaryResponse {
  data: TransactionSummary;
  errors: boolean;
}