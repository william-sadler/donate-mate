import { useNavigate, Link } from 'react-router-dom'
import { useAllOrganisations } from '../hooks/useOrganisations'
import { useUsers } from '../hooks/useUsers'
import { User } from '../../models/modelUsers'
import LoginDropdown from '../components/LoginDropdown'

export default function LoginRedirect() {
  const navigate = useNavigate()
  const allOrgs = useAllOrganisations()
  const isUser = useUsers()

  const handleJoinSelect = (orgId: number) => {
    // Handle the selected organization ID here
    navigate(`/org/${orgId}`)
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
          <h3 className="card-heading">Sign Up for an Organization</h3>
          <p className="card-text">Create a new organization to get started.</p>
          <Link to="/org/signup" className="custom-signup-button">
            Sign Up
          </Link>
        </div>

        {/* Join Card */}
        <div className="card">
          <h3 className="card-heading">Join an Organization</h3>
          <p className="card-text">
            Join an existing organization and get involved.
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
