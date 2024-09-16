import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from '../apis/apiUsers'
import { useAuth0 } from '@auth0/auth0-react'

export function useUsers() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await getAccessTokenSilently().catch(() => {
        console.error('Login Required')
        return 'undefined'
      })
      if (token === 'undefined') return []
      return API.getUsers({ token })
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useAddUser(),
    accept: useAcceptRequest(),
    deny: useDenyRequest(),
  }
}

export function useAllUsersById(orgId: number) {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['users', orgId],
    queryFn: async () => {
      const token = await getAccessTokenSilently().catch(() => {
        console.error('Login Required')
        return 'undefined'
      })
      if (token === 'undefined') return []
      return API.getAllUsersById({ id: orgId, token })
    },
    enabled: !!user,
  })

  return {
    ...query,
  }
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  return mutation
}

export function useAddUser() {
  return useUserMutation(API.addUser)
}

export function useAcceptRequest() {
  return useUserMutation(API.acceptingUserRequest)
}

export function useDenyRequest() {
  return useUserMutation(API.denyingUserRequest)
}
