import { Category, User } from "@/types";

/**
 * Main TransactionType type
 */
export interface TransactionType {
  id: string;
  name: string;

  userId: string | null;
  user?: User;

  categories?: Category[];
}

/**
 * Payload for creating/updating a transaction type
 */
export interface TransactionTypePayload {
  name: string;
}

/**
 * List response shape from API
 */
export interface TransactionTypeListResponse {
  data: TransactionType[];
  errors: boolean;
}

/**
 * Single transaction type response shape
 */
export interface TransactionTypeDetailResponse {
  data: TransactionType;
  errors: boolean;
}
