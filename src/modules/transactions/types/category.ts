import { TransactionType, User } from "@/types";

/**
 * Main Category type (used in list/detail)
 */
export interface Category {
  id: string;
  name: string;

  userId: string | null;
  user?: User;

  transactionTypeId: string;
  transactionType: TransactionType;

  // Optional: only if you need this in special cases
  transactions?: unknown[];
}

/**
 * Payload for creating/updating a category
 */
export interface CategoryPayload {
  name: string;
  transactionTypeId: string;
}

/**
 * List response shape from API
 */
export interface CategoryListResponse {
  data: Category[];
  errors: boolean;
}

/**
 * Single category response shape
 */
export interface CategoryDetailResponse {
  data: Category;
  errors: boolean;
}

/**
 * Single category response shape
 */
export interface CategoryDetailDeleteResponse {
  data: {
    message: string,
    deletedCategory: Category
  };
  errors: boolean;
}
