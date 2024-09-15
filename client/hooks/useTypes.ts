import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationResult,
} from '@tanstack/react-query'
import { getAllDonationNames, getTypesById } from '../apis/apiTypes'
import * as API from '../apis/apiTypes'

export function useTypesById(id: number) {
  const query = useQuery({
    queryKey: ['type', id],
    queryFn: () => getTypesById(id),
  })

  return {
    ...query,
    patchTypesData: usePatchTypes(),
    postTypesData: usePostTypes(),
    deleteTypesData: useDeleteTypes(),
  }
}

export function useAllTypes() {
  const query = useQuery({
    queryKey: ['types'],
    queryFn: () => API.getAllTypes(),
  })

  return {
    ...query,
  }
}

export function useAllDonationNames() {
  const query = useQuery({
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

export function usePatchTypes() {
  return useTypesMutation(API.patchTypesById)
}

export function usePostTypes() {
  return useTypesMutation(API.postTypes)
}

export function useDeleteTypes() {
  return useTypesMutation(API.deleteTypesById)
}
