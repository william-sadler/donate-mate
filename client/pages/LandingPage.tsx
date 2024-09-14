import { Link } from 'react-router-dom'
import LandingCard from '../components/LandingCard'
import { useAllOrganisations } from '../hooks/useOrganisations'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0()
  const { data, isPending, isError, error } = useAllOrganisations()

  const handleSignIn = () => {
    console.log('sign in')
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`,
      },
    })
  }

  if (isPending) return <p>Yoo hold up brother!</p>
  if (isError) return <p>Naa bao, it aint working: {error.message}</p>
  console.log(data)
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">DonateMate</h1>
      <IfAuthenticated>
        <Link to="/org/signup">
          <button className="primary_button flex items-center space-x-4 rounded bg-blue px-4 py-2 transition duration-300 hover:bg-darkerTeal">
            Sign Up!
          </button>
        </Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button
          className="primary_button flex items-center space-x-4 rounded bg-blue px-4 py-2 transition duration-300 hover:bg-darkerTeal"
          onClick={handleSignIn}
        >
          Sign Up!
        </button>
      </IfNotAuthenticated>
      <div className="image-grid">
        {data.map((organisation, i) => (
          <Link to={`/org/${organisation.id}`} key={i}>
            <LandingCard
              name={organisation.name}
              image={organisation.image}
              orgId={organisation.id}
              location={organisation.location}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
