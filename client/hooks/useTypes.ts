import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationResult,
} from '@tanstack/react-query'
import { getAllDonationNames, getTypesById } from '../apis/apiTypes'
import { DonationNames, Types } from '../../models/modelTypes'

export function useTypesById(id: number) {
  const query = useQuery<Types[]>({
    queryKey: ['type', id],
    queryFn: () => getTypesById(id),
  })

  return {
    ...query,
  }
}
export function useAllDonationNames() {
  const query = useQuery<DonationNames[]>({
    queryKey: ['donationNames'],
    queryFn: () => getAllDonationNames(),
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
      queryClient.invalidateQueries({ queryKey: ['type'] })
    },
  })

  return mutation
}
