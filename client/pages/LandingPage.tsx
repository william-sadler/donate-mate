import { Link } from 'react-router-dom'
import LandingCard from '../components/LandingCard'
import FilterTypes from '../components/FilterTypes'
import { useAllOrganisations } from '../hooks/useOrganisations'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { useAllTypes } from '../hooks/useTypes'

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0()
  const { data, isPending, isError, error } = useAllOrganisations()
  const {
    data: typeData,
    isPending: typeIsPending,
    isError: typeIsError,
    error: typeError,
  } = useAllTypes()
  const [selectedType, setSelectedType] = useState([] as string[])

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

  if (typeIsPending) return <p>Gathering resources...</p>
  if (typeIsError)
    return <p>Oops! Cannot find the donation type: {typeError.message}</p>

  return (
    <div className="container">
      <IfAuthenticated>
        <h1 className=" heading-3">
          Community Organisation and Donation Centers
        </h1>
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
      <div className="filterTypes paragraph">
        <FilterTypes setfilter={setSelectedType} history={selectedType} />
      </div>
      <div className="grid-layout">
        {data
          .filter(
            (org) =>
              typeData.filter(
                (type) =>
                  selectedType.find((selection) => type.name === selection) &&
                  type.organisationId === org.id,
              ).length === 1 || selectedType.length === 0,
          )
          .map((organisation, i) => (
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
