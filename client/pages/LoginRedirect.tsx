import { useNavigate, Link } from 'react-router-dom'
import { useAllOrganisations } from '../hooks/useOrganisations'
import { useUsers } from '../hooks/useUsers'
import { User } from '../../models/modelUsers'
import LoginDropdown from '../components/LoginDropdown'
import { usePendingUsersById } from '../hooks/usePendingUsers'
import { useAuth0 } from '@auth0/auth0-react'

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export default function LoginRedirect() {
  const { user, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const allOrgs = useAllOrganisations()
  const isUser = useUsers()
  const pendingUser = usePendingUsersById(0)

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

  if (
    allOrgs.data?.find((org) => org.id === (userCheck ? userCheck.orgId : null))
  ) {
    navigate(
      `/org/${allOrgs.data?.find((org) => org.id === (userCheck ? userCheck.orgId : null))?.id}`,
    )
  }

  return (
    <div className="login-redirect-container">
      <h2 className="login-redirect-heading">You Are Loved 💖</h2>

      <div className="card-container">
        {/* Sign Up Card */}
        <div className="card">
          <h3 className="card-heading">Sign Up for an Organisation</h3>
          <p className="card-text">Create a new organisation to get started.</p>
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
              allOrgs.data?.map((org) => ({ id: org.id, name: org.name })) || []
            }
            onSelect={handleJoinSelect}
          />
        </div>
      </div>
    </div>
  )
}
