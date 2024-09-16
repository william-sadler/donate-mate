import { useNavigate } from 'react-router-dom'
import { usePendingUsersById } from '../hooks/usePendingUsers'
import { User } from '../../models/modelUsers'

interface Props {
  orgId: number | null
  handle: (employe: User) => void
  acceptedUsers: string[]
  isOwner: boolean
}

export default function UserPendingRequests({
  isOwner,
  orgId,
  handle,
  acceptedUsers,
}: Props) {
  const navigate = useNavigate()
  const pendingUsers = usePendingUsersById(orgId ?? 0)

  if (pendingUsers.isPending || !pendingUsers) {
    let failures = ''
    if (pendingUsers.failureCount > 0) {
      failures = ` (failed ${pendingUsers.failureCount} times)`
    }
    if (pendingUsers.failureCount > 3) {
      navigate('/')
    }
    return <div className="text-red-500">Hmmm, suspicious... {failures}</div>
  }

  if (pendingUsers.error instanceof Error) {
    return (
      <div className="text-red-500">
        Failed to load user: {pendingUsers.error.message}
      </div>
    )
  }
  const requests = pendingUsers.data

  return (
    isOwner &&
    requests &&
    requests.length > 0 && (
      <div>
        <h4 className="mb-2 text-lg font-semibold">Pending User Requests</h4>
        <ul className="mb-6 list-inside list-disc">
          {requests
            .filter(
              (item) => !acceptedUsers.find((value) => item.name === value),
            )
            .map((pendingUser) => (
              <li
                key={pendingUser.auth0Id}
                className="mb-2 flex items-center justify-between"
              >
                <span className="text-gray-700">{pendingUser.name}</span>
                <button
                  onClick={() => handle(pendingUser)}
                  className="custom-signup-button"
                >
                  Request
                </button>
              </li>
            ))}
        </ul>
      </div>
    )
  )
}
