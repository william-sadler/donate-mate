import { useNavigate } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/modelUsers'
import { useOrganisationsById } from '../hooks/useOrganisations'
import { useState, useEffect } from 'react'
import { usePendingUsersById } from '../hooks/usePendingUsers'

export default function UserProfilePage() {
  const navigate = useNavigate()
  const [orgId, setOrgId] = useState<number>(0)
  const { user } = useAuth0()
  const isUser = useUsers()
  const pendingUsers = usePendingUsersById(orgId)
  const org = useOrganisationsById(orgId)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (isUser.data) {
      // Assuming there's a way to fetch orgId from user or a separate API
      const fetchOrgId = async () => {
        const userCheck = isUser.data as User
        setOrgId(userCheck.orgId)
        setIsOwner(userCheck.isOwner)
      }
      fetchOrgId()
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
          alt={userCheck.name}
          className="mr-4 h-24 w-24 rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">{userCheck.name}</h3>
          <p className="text-gray-600">{userCheck.email}</p>
        </div>
      </div>

      {/* Organization Information Card */}
      {orgId && organisation && (
        <button
          onClick={() => navigate(`/org/${orgId}`)}
          className="bg-blue-100 border-blue-200 hover:bg-blue-200 mb-6 cursor-pointer rounded-lg border p-4"
        >
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
                  className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white"
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
