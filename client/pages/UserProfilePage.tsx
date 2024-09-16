import { Link, useNavigate } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { User } from '../../models/modelUsers'
import UserPendingRequests from '../components/UserPendingRequests'
import UserStaffList from '../components/UserStaffList'
import UserOrgCard from '../components/UserOrgCard'
import LoginDropdown from '../components/LoginDropdown'
import { useAllOrganisations } from '../hooks/useOrganisations'
import { usePendingUsers } from '../hooks/usePendingUsers'
import { getUsers } from '../apis/apiUsers'

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export default function UserProfilePage() {
  const { user, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const [orgId, setOrgId] = useState<number | null>(null)
  const [isOwner, setIsOwner] = useState(false)

  const [acceptedUsers, setAcceptedUsers] = useState<string[]>([])
  const allOrgs = useAllOrganisations()
  const pendingUser = usePendingUsers()
  const isUser = useUsers()

  useEffect(() => {
    const fetchOrgId = async () => {
      const token = await getAccessTokenSilently().catch(() => {
        console.error('Login Required')
        return 'undefined'
      })
      if (token === 'undefined') return null
      try {
        const { orgId, isOwner } = await getUsers({ token })
        setOrgId(orgId)
        setIsOwner(isOwner)
      } catch (err) {
        return
      }
    }
    fetchOrgId()
  }, [getAccessTokenSilently])

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

  if (allOrgs.isPending) {
    let failures = ''
    if (allOrgs.failureCount > 0) {
      failures = ` (failed ${allOrgs.failureCount} times)`
    }

    if (allOrgs.failureCount > 3) {
      navigate('/')
    }

    return <div>Its Working!... {failures}</div>
  }

  if (allOrgs.error instanceof Error) {
    return <div>Failed to load organisations: {allOrgs.error.message}</div>
  }

  const userCheck = isUser.data as User

  const handleRequest = async (employee: User, name: string) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    console.log(`Request for user: ${employee}`)
    if (employee && name === 'accept') {
      setAcceptedUsers([...acceptedUsers, employee.name])
      isUser.accept.mutate({
        admin: userCheck,
        newUser: employee,
        token: token,
      })
    }
    if (employee && name === 'deny') {
      setAcceptedUsers([...acceptedUsers, employee.name])
      isUser.deny.mutate({
        admin: userCheck,
        newUser: employee,
        token: token,
      })
    }
  }

  const handleJoinSelect = async (orgId: number) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })

    pendingUser.add.mutate({
      newUser: {
        name: user?.name || '',
        email: user?.email || '',
        orgId: orgId,
      },
      token: token,
    })

    await sleep(500)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">
        You are Amazing! <span className="text-blue-500">⚡</span>
      </h2>

      {/* User Profile Section */}
      <div className="mb-8 flex flex-col items-center gap-6 rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
        <img
          src={user?.picture || 'https://via.placeholder.com/150'}
          alt={userCheck.name || user?.name}
          className="border-blue-300 h-32 w-32 rounded-full border-2 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900">
            {userCheck.name || user?.name}
          </h3>
          <p className="mb-2 text-gray-700">{userCheck.email || user?.email}</p>
          <p className="text-gray-600">
            {userCheck.isOwner ? (
              <span className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm">
                Store Manager
              </span>
            ) : (
              userCheck.name && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
                  Volunteer
                </span>
              )
            )}
          </p>
        </div>

        {/* Organization Information Card */}
        {orgId ? (
          <div className="w-full max-w-xs flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Link to={`/org/${orgId}`}>
              <UserOrgCard orgId={orgId} />
            </Link>
          </div>
        ) : (
          <div className="card-container">
            {/* Sign Up Card */}
            <div className="card">
              <h3 className="card-heading">Sign Up for an Organisation</h3>
              <p className="card-text">
                Create a new organisation to get started.
              </p>
              <Link to="/org/signup" className="custom-signup-button">
                Sign Up
              </Link>
            </div>

            {/* Join Card */}
            <div className="card">
              <h3 className="card-heading">Join an Organisation</h3>
              <p className="card-text">
                Join an existing organisation and get involved.
              </p>
              <LoginDropdown
                options={
                  allOrgs.data?.map((org) => ({
                    id: org.id,
                    name: org.name,
                  })) || []
                }
                onSelect={handleJoinSelect}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mb-8 flex flex-col items-center gap-6 rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
        {/* Grid Layout for Staff List and Pending Requests */}
        <div
          className={`${isOwner && pendingUser.data?.find((data) => data?.name) ? 'custom-user-grid' : 'flex w-full flex-col'}`}
        >
          {/* Staff List */}
          {userCheck?.name && (
            <div className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
              <UserStaffList orgId={orgId} />
            </div>
          )}
          {/* Pending Users List */}
          {isOwner && pendingUser.data?.find((data) => data?.name) && (
            <div className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
              <UserPendingRequests
                handle={handleRequest}
                acceptedUsers={acceptedUsers}
                orgId={orgId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
