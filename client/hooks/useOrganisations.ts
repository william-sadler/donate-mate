import { useQuery } from '@tanstack/react-query'
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
    updateStatus: useUpdateStatus(),
  }
}
function useUpdateStatus() {
  throw new Error('Function not implemented.')
}
