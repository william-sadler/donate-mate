import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationResult,
} from '@tanstack/react-query'
import { getTypesById } from '../apis/apiTypes'
import { Types } from '../../models/modelTypes'

export function useTypes(id: number) {
  const query = useQuery<Types[]>({
    queryKey: ['types'],
    queryFn: () => getTypesById(id),
  })

  return {
    ...query,
  }
}

export function useTypesMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
): UseMutationResult<TData, unknown, TVariables> {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['types'] })
    },
  })

  return mutation
}
