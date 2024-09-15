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
import LandingSearch from '../components/LandingSearch'

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0()
  const {
    data: orgData,
    isPending: orgIsPending,
    isError: orgIsError,
    error: orgError,
  } = useAllOrganisations()
  const {
    data: typeData,
    isPending: typeIsPending,
    isError: typeIsError,
    error: typeError,
  } = useAllTypes()

  const [selectedType, setSelectedType] = useState<string[]>([])
  const [orgFilter, setOrgFilter] = useState<string[]>([])

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`,
      },
    })
  }

  if (orgIsPending || typeIsPending) return <p>Loading...</p>
  if (orgIsError) return <p>Error fetching organizations: {orgError.message}</p>
  if (typeIsError) return <p>Error fetching types: {typeError.message}</p>

  // Filtering logic
  const filteredOrgs = orgData.filter((org) => {
    const matchesName =
      orgFilter.length === 0 ||
      orgFilter.some((filter) =>
        org.name.toLowerCase().includes(filter.toLowerCase()),
      )
    const hasMatchingType = typeData.some(
      (type) =>
        selectedType.length === 0 ||
        (selectedType.includes(type.name) && type.organisationId === org.id),
    )
    return matchesName && hasMatchingType
  })

  const handleResetFilters = () => {
    setOrgFilter([])
    setSelectedType([])
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold">DonateMate</h1>
      <IfAuthenticated>
        <Link to="/org/signup">
          <button className="primary_button bg-blue hover:bg-darkerTeal flex items-center space-x-4 rounded px-4 py-2 transition duration-300">
            Sign Up!
          </button>
        </Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button
          className="primary_button bg-blue hover:bg-darkerTeal flex items-center space-x-4 rounded px-4 py-2 transition duration-300"
          onClick={handleSignIn}
        >
          Sign Up!
        </button>
      </IfNotAuthenticated>
      <div className="flex w-full flex-col items-center space-y-4 p-4">
        <div className="w-full max-w-lg">
          <LandingSearch onSubmit={setOrgFilter} />
        </div>
        <div className="w-full max-w-lg">
          <FilterTypes setfilter={setSelectedType} history={selectedType} />
          {(orgFilter.length > 0 || selectedType.length > 0) && (
            <button
              className="primary_button bg-blue hover:bg-darkerTeal flex items-center space-x-4 rounded px-4 py-2 transition duration-300"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
      <div className="grid-layout">
        {filteredOrgs.length > 0 ? (
          filteredOrgs.map((organisation) => (
            <Link to={`/org/${organisation.id}`} key={organisation.id}>
              <LandingCard
                name={organisation.name}
                image={organisation.image}
                orgId={organisation.id}
                location={organisation.location}
              />
            </Link>
          ))
        ) : (
          <p>No organizations found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}
