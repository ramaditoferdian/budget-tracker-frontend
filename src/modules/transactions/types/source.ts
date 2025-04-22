import { User, Transaction } from '@/types'

/**
 * Main Source type (used in list/detail)
 */
export interface Source {
  id: string
  name: string
  accountNumber?: string | null
  initialAmount?: number | null
  balance: number

  userId?: string | null
  user?: User

  transactions?: Transaction[] // Sebagai sumber dana
  receivedTransactions?: Transaction[] // Sebagai target (transfer/tabungan)
}

interface Pagination {
  rowsCount: number;
  pageCount: number;
  currentPage: number;
  limit: number;
}

/**
 * Payload for creating/updating a source
 */
export interface SourcePayload {
  name: string
  // icon: string // frontend-only field (misal: Wallet, Bank, Cash)
  accountNumber?: string
  initialAmount?: number
  balance?: number // opsional saat buat, akan dihitung dari initialAmount
}

/**
 * List response shape from API
 */
export interface SourceListResponse {
  data: {
    sources: Source[];
    pagination: Pagination;
  };
  errors: boolean;
}

/**
 * Single source response shape
 */
export interface SourceDetailResponse {
  data: Source
  errors: boolean
}

/**
 * Delete response shape
 */
export interface SourceDetailDeleteResponse {
  data: {
    message: string
    deletedSource: Source
  }
  errors: boolean
}
