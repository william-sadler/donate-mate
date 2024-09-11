import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/apiOrganisations'

export function useAllOrganisations() {
  const query = useQuery({
    queryKey: ['organisations'],
    queryFn: () => API.getAllOrganisations(),
  })
  return query
}
