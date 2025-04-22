import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createSource,
  deleteSource,
  getSources,
  updateSource,
} from '../services/sourceService'
import { SourceListResponse, SourcePayload } from '@/types'
import { usePessimisticUpdate } from '@/hooks/usePessimisticUpdate'

/**
 * Fetch sources (GET /sources)
 */
export const useSources = () => {
  return useQuery<SourceListResponse, Error>({
    queryKey: ['sources'],
    queryFn: getSources,
    select: (data) => data,
  })
}

/**
 * Create a new source (POST /sources)
 */
export const useCreateSource = () => {
  const { onSuccess, onError } = usePessimisticUpdate('sources')
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (payload: SourcePayload) => createSource(payload),
    onSuccess,
    onError,
  })

  return { mutate, isPending, isError, isSuccess }
}

/**
 * Update an existing source (PUT /sources/:id)
 */
export const useUpdateSource = () => {
  const { onSuccess, onError } = usePessimisticUpdate('sources')
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SourcePayload }) =>
      updateSource(id, payload),
    onSuccess,
    onError,
  })

  return { mutate, isPending, isError, isSuccess }
}

/**
 * Delete a source (DELETE /sources/:id)
 */
export const useDeleteSource = () => {
  const { onSuccess, onError } = usePessimisticUpdate('sources')
  const { mutate, isPending, isError, isSuccess } = useMutation({
      mutationFn: (id: string) => deleteSource(id),
      onSuccess,
      onError,
    })
  
    return { mutate, isPending, isError, isSuccess }
}
