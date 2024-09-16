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
    return <div className="text-red-500">Hmmm, suspicious... {failures}</div>
  }

  if (pendingUsers.error instanceof Error) {
    return (
      <div className="text-red-500">
        Failed to load user: {pendingUsers.error.message}
      </div>
    )
  }
  const staffList = pendingUsers.data

  return (
    staffList &&
    staffList.length > 0 && (
      <div>
        <h4 className="mb-2 text-lg font-semibold">Staff List</h4>
        <ul className="mb-6 list-inside list-disc">
          {staffList.map((pendingUser, i) => {
            if (pendingUser.isOwner) {
              return (
                <li
                  key={(pendingUser.name, i)}
                  className="mb-2 flex items-center justify-between"
                >
                  <span className="text-black">{pendingUser.name}</span>
                  <span className="text-gray-700">Store Manager</span>
                </li>
              )
            } else {
              return (
                <li
                  key={(pendingUser.name, i)}
                  className="mb-2 flex items-center justify-between"
                >
                  <span className="text-black">{pendingUser.name}</span>
                  <span className="text-gray-700">{pendingUser.email}</span>
                  <span className="text-gray-700">Volunteer</span>
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  )
}
