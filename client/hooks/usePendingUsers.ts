import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from '../apis/apiPendingUsers'
import { useAuth0 } from '@auth0/auth0-react'

export function usePendingUsers() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['pending'],
    queryFn: async () => {
      const token = await getAccessTokenSilently().catch(() => {
        console.error('Login Required')
        return 'undefined'
      })
      if (token === 'undefined') return []
      return API.getPendingUsers({ token })
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useAddUser(),
  }
}

export function usePendingUsersById(id: number) {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['pending'],
    queryFn: async () => {
      const token = await getAccessTokenSilently().catch(() => {
        console.error('Login Required')
        return 'undefined'
      })
      if (token === 'undefined') return []
      return API.getPendingUsers({ token, id })
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useAddUser(),
  }
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending'] })
    },
  })

  return mutation
}

export function useAddUser() {
  return useUserMutation(API.addPendingUsers)
}
