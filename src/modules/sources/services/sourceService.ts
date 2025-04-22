import { get, post, put, del } from '@/lib/fetcher'
import {
  SourcePayload,
  SourceListResponse,
  SourceDetailResponse,
  SourceDetailDeleteResponse,
} from '@/types'

/**
 * Fetch all sources (GET /sources)
 */
export const getSources = () =>
  get<SourceListResponse>('/sources')

/**
 * Create new source (POST /sources)
 */
export const createSource = (payload: SourcePayload) =>
  post<SourceDetailResponse>('/sources', payload)

/**
 * Update existing source by ID (PUT /sources/:id)
 */
export const updateSource = (id: string, payload: SourcePayload) =>
  put<SourceDetailResponse>(`/sources/${id}`, payload)

/**
 * Delete source by ID (DELETE /sources/:id)
 */
export const deleteSource = (id: string) =>
  del<SourceDetailDeleteResponse>(`/sources/${id}`)
