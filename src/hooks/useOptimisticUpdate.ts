import { useQueryClient } from '@tanstack/react-query'

export const useOptimisticUpdate = <T>(
  queryKey: string,
  transformFn: (previousData: any, newData: T) => any
) => {
  const queryClient = useQueryClient()

  const onMutate = async (newData: T) => {
    await queryClient.cancelQueries({ queryKey: [queryKey] })  // Pastikan queryKey adalah array

    // Ambil data query yang ada
    const previousData = queryClient.getQueryData<any>([queryKey])  // Pastikan queryKey adalah array

    // Optimistic update: Ubah data secara lokal
    queryClient.setQueryData([queryKey], transformFn(previousData, newData))  // Pastikan queryKey adalah array

    return { previousData }
  }

  const onError = (error: any, newData: T, context: any) => {
    // Rollback ke previous data jika terjadi error
    if (context?.previousData) {
      queryClient.setQueryData([queryKey], context.previousData)  // Pastikan queryKey adalah array
    }
    console.error('Error:', error)
  }

  const onSettled = () => {
    // Setelah mutasi selesai, invalidate query
    queryClient.invalidateQueries({ queryKey: [queryKey] })  // Pastikan queryKey adalah array
  }

  return { onMutate, onError, onSettled }
}
