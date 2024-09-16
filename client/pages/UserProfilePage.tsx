import { useNavigate } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { useAuth0 } from '@auth0/auth0-react'
import { useOrganisationsById } from '../hooks/useOrganisations'
import { useState, useEffect } from 'react'
import { usePendingUsersById } from '../hooks/usePendingUsers'
import { User } from '../../models/modelUsers'

export default function UserProfilePage() {
  const navigate = useNavigate()
  const [orgId, setOrgId] = useState<number | null>(null)
  const [isOwner, setIsOwner] = useState(false)
  const { user } = useAuth0()
  const isUser = useUsers()
  const pendingUsers = usePendingUsersById(orgId ?? 0)
  const org = useOrganisationsById(orgId ?? 0)

  useEffect(() => {
    if (isUser.data) {
      const userCheck = isUser.data as User
      setOrgId(userCheck.orgId || null)
      setIsOwner(userCheck.isOwner || false)
    }
  }, [isUser.data])

  if (isUser.isPending) {
    let failures = ''
    if (isUser.failureCount > 0) {
      failures = ` (failed ${isUser.failureCount} times)`
    }
    if (isUser.failureCount > 3) {
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

  if (!user) {
    navigate('/')
  }

  const userCheck = isUser.data as User
  const organisation = org.data
  const requests = pendingUsers.data

  const handleRequest = (pendingUserId: string) => {
    console.log(`Request for user: ${pendingUserId}`)
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">You are Amazing! ⚡</h2>

      {/* User Profile Section */}
      <div className="mb-6 flex items-center">
        <img
          src={user?.picture || 'https://via.placeholder.com/150'}
          alt={userCheck.name || user?.name}
          className="mr-4 h-24 w-24 rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">
            {userCheck.name || user?.name}
          </h3>
          <p className="text-gray-600">{userCheck.email || user?.email}</p>
        </div>
      </div>

      {/* Organization Information Card */}
      {orgId && organisation && (
        <button
          onClick={() => navigate(`/org/${orgId}`)}
          className="bg-blue-100 border-blue-200 hover:bg-blue-200 mb-6 cursor-pointer rounded-lg border p-4"
        >
          <img src={organisation.image} alt={organisation.name} />
          <h4 className="text-lg font-semibold">
            Organization: {organisation.name}
          </h4>
          <p className="text-gray-700">{organisation.about}</p>
        </button>
      )}

      {/* Pending Users List */}
      {isOwner && requests && requests.length > 0 && (
        <div>
          <h4 className="mb-2 text-lg font-semibold">Pending User Requests</h4>
          <ul className="mb-6 list-inside list-disc">
            {requests.map((pendingUser) => (
              <li
                key={pendingUser.auth0Id}
                className="mb-2 flex items-center justify-between"
              >
                <span className="text-gray-700">{pendingUser.name}</span>
                <button
                  onClick={() => handleRequest(pendingUser.auth0Id)}
                  className="custom-signup-button"
                >
                  Request
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
