import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from '../apis/apiUsers'
import { useAuth0 } from '@auth0/auth0-react'

export function useUsers() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return API.getUsers({ token })
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
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return mutation
}

export function useAddUser() {
  return useUserMutation(API.addUser)
}
