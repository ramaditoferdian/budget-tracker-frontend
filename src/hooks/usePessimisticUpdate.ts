import { useQueryClient, QueryKey } from '@tanstack/react-query';

export const usePessimisticUpdate = (queryKey: QueryKey[0]) => {
  const queryClient = useQueryClient();

  const onError = (error: unknown) => {
    if (error instanceof Error) {
      console.error('Mutation failed:', error.message);
    } else {
      console.error('Mutation failed:', error);
    }
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === queryKey,
    });

    queryClient.refetchQueries({
      predicate: (query) => query.queryKey[0] === queryKey,
    });
  };

  return { onError, onSuccess };
};
