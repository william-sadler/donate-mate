import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as API from '../apis/apiOrganisations'

export function useAllOrganisations() {
  const query = useQuery({
    queryKey: ['organisations'],
    queryFn: () => API.getAllOrganisations(),
  })
  return query
}

export function useOrganisationsById(id: number) {
  const query = useQuery({
    queryKey: ['organisations', id],
    queryFn: () => API.getOrganisationsById(id),
  })
  return {
    ...query,
    patchOrgData: usePatchOrganisation(),
    postOrgData: usePostOrganisation(),
  }
}

export function useOrganisationMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fruits'] })
    },
  })

  return mutation
}

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */

export function usePatchOrganisation() {
  return useOrganisationMutation(API.patchOrganisationById)
}

export function usePostOrganisation() {
  return useOrganisationMutation(API.postOrganisation)
}
