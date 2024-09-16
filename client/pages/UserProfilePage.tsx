import { useNavigate } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { User } from '../../models/modelUsers'
import UserPendingRequests from '../components/UserPendingRequests'
import UserStaffList from '../components/UserStaffList'
import UserOrgCard from '../components/UserOrgCard'

export default function UserProfilePage() {
  const { user, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const [orgId, setOrgId] = useState<number | null>(null)
  const [isOwner, setIsOwner] = useState(false)
  const [acceptedUsers, setAcceptedUsers] = useState<string[]>([])
  const isUser = useUsers()

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

  const handleRequest = async (employee: User) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    console.log(`Request for user: ${employee}`)
    if (employee) {
      setAcceptedUsers([...acceptedUsers, employee.name])
      isUser.accept.mutate({
        admin: userCheck,
        newUser: employee,
        token: token,
      })
    }
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
      <UserOrgCard orgId={orgId} />

      {/* Staff List */}
      <UserStaffList orgId={orgId} />

      {/* Pending Users List */}
      {isOwner && (
        <UserPendingRequests
          orgId={orgId}
          handle={handleRequest}
          acceptedUsers={acceptedUsers}
          isOwner={isOwner}
        />
      )}
    </div>
  )
}
