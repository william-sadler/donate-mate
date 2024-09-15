import { useNavigate } from 'react-router-dom'
import { useAllOrganisations } from '../hooks/useOrganisations'
import { useUsers } from '../hooks/useUsers'
import { User } from '../../models/modelUsers'

export default function LoginRedirect() {
  const navigate = useNavigate()
  const allOrgs = useAllOrganisations()

  const isUser = useUsers()

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
      <h2 className="heading-2-caveat">You Are Loved 💖</h2>

      <div className="card-container">
        {/* Sign Up Card */}
        <div className="card">
          <h3 className="heading-3-italic">Sign Up for an Organization</h3>
          <p className="card-text">Create a new organization to get started.</p>
          <button className="custom-signup-button">Sign Up</button>
        </div>

        {/* Join Card */}
        <div className="card">
          <h3 className="heading-3-italic">Join an Organization</h3>
          <p className="card-text">
            Join an existing organization and get involved.
          </p>
          <button className="custom-join-button">Join</button>
        </div>
      </div>
    </div>
  )
}
