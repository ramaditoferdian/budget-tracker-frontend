import { useQueryClient } from '@tanstack/react-query'

export const usePessimisticUpdate = (queryKey: string) => {
  const queryClient = useQueryClient()

  const onError = (error: any) => {
    console.error('Mutation failed:', error)
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey] })
  }

  return { onError, onSuccess }
}
