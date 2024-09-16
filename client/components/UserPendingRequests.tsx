import { useNavigate } from 'react-router-dom'
import { usePendingUsers } from '../hooks/usePendingUsers'
import { User } from '../../models/modelUsers'
import { useUsers } from '../hooks/useUsers'

interface Props {
  handle: (employee: User, name: string) => void
  acceptedUsers: string[]
  orgId: number | null
}

export default function UserPendingRequests({
  handle,
  acceptedUsers,
  orgId,
}: Props) {
  const navigate = useNavigate()
  const isUser = useUsers()

  // Fetch pending users only if orgId is valid
  const pendingUsers = usePendingUsers()

  // Handle loading and errors
  if (isUser.isPending || pendingUsers.isPending) {
    let failures = ''
    if (isUser.failureCount > 0) {
      failures = ` (failed ${isUser.failureCount} times)`
    }
    if (pendingUsers.failureCount > 3) {
      navigate('/')
    }
    return <div className="text-red-500">Hmmm, suspicious... {failures}</div>
  }

  if (isUser.error instanceof Error) {
    return (
      <div className="text-red-500">
        Failed to load user: {isUser.error.message}
      </div>
    )
  }

  if (pendingUsers.error instanceof Error) {
    return (
      <div className="text-red-500">
        Failed to load pending users: {pendingUsers.error.message}
      </div>
    )
  }

  const requests = pendingUsers.data

  // Handle cases where orgId or requests might be invalid
  return (
    orgId !== null &&
    requests &&
    requests.length > 0 && (
      <div className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h4 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
            Pending User Requests
          </h4>
          <ul className="space-y-4">
            {requests
              .filter(
                (item) => !acceptedUsers.find((value) => item.name === value),
              )
              .map((pendingUser) => (
                <li
                  key={pendingUser.auth0Id}
                  className="flex items-center justify-between gap-x-4 rounded-lg border border-gray-200 p-4 shadow-sm"
                >
                  <div className="flex flex-1 items-center gap-x-4">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={'https://via.placeholder.com/150'}
                      alt={pendingUser.name}
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {pendingUser.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {pendingUser.isOwner ? 'Store Manager' : 'Volunteer'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {pendingUser.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <button
                      name="accept"
                      onClick={(event) =>
                        handle(pendingUser, event.currentTarget.name)
                      }
                      className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Accept
                    </button>
                    <button
                      name="deny"
                      onClick={(event) =>
                        handle(pendingUser, event.currentTarget.name)
                      }
                      className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  )
}
