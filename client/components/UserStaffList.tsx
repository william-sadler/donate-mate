import { useNavigate } from 'react-router-dom'
import { useAllUsersById } from '../hooks/useUsers'

interface Props {
  orgId: number | null
}

export default function UserStaffList({ orgId }: Props) {
  const navigate = useNavigate()
  const pendingUsers = useAllUsersById(orgId ?? 0)

  if (pendingUsers.isPending || !pendingUsers) {
    let failures = ''
    if (pendingUsers.failureCount > 0) {
      failures = ` (failed ${pendingUsers.failureCount} times)`
    }
    if (pendingUsers.failureCount > 3) {
      navigate('/')
    }
    return (
      <div className="text-center text-red-500">
        Hmmm, suspicious... {failures}
      </div>
    )
  }

  if (pendingUsers.error instanceof Error) {
    return (
      <div className="text-center text-red-500">
        Failed to load user: {pendingUsers.error.message}
      </div>
    )
  }
  const staffList = pendingUsers.data

  return (
    staffList &&
    staffList.length > 0 && (
      <div className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
            Staff List
          </h2>
          <ul className="space-y-4">
            {staffList.map((pendingUser, i) => (
              <li
                key={i}
                className="flex items-center gap-x-4 rounded-lg border border-gray-200 p-4 shadow-sm"
              >
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
                  <p className="text-sm text-gray-500">{pendingUser.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  )
}
