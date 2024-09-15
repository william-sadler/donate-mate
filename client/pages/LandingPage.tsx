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
import FilterTag from '../components/FilterTag'

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

  const handleDeleteFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name
    setSelectedType((prev) => prev.filter((t) => t !== type))
  }

  return (
    <div className="container">
      <IfAuthenticated>
        <div className="mb-4 flex items-center justify-end space-x-4">
          <span className="text-lg">Are you an org?</span>
          <Link to="/org/signup">
            <button className="primary_button bg-blue hover:bg-darkerTeal flex items-center space-x-4 rounded px-4 py-2 transition duration-300">
              Sign Up!
            </button>
          </Link>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="mb-4 flex items-center justify-end space-x-4">
          <span className="heading-2-caveat mb-4">Are you an org?</span>
          <button
            className="primary_button bg-blue hover:bg-darkerTeal mb-4 flex items-center space-x-4 rounded px-4 py-2 transition duration-300"
            onClick={handleSignIn}
          >
            Sign Up!
          </button>
        </div>
      </IfNotAuthenticated>
      <section className="mb-4 flex max-w-fit flex-col items-start space-y-4 p-4">
        <h2 className="heading-1-caveat mb-4">Ready to donate?</h2>
        <div className="mb-4 w-full max-w-lg">
          <LandingSearch onSubmit={setOrgFilter} />
        </div>
        <div className="mb-4 w-full max-w-lg">
          <div className="custom-grid">
            <div className="filterTypes paragraph flex max-w-full flex-wrap items-center space-x-4">
              <FilterTypes setFilter={setSelectedType} history={selectedType} />
            </div>
            <div className="filterTypes paragraph flex max-w-full flex-wrap items-center space-x-4">
              <section className="mx-fit max-w-3xl pl-0">
                <label className="mb-6 block">
                  <h2 className="mb-2 text-xl font-semibold">Filter By:</h2>
                  <select
                    disabled
                    value="Location"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Location">Location</option>
                  </select>
                </label>
              </section>
            </div>
            <section className="filterTypes paragraph flex max-w-full flex-wrap items-center space-x-4">
              {(orgFilter.length > 0 || selectedType.length > 0) && (
                <button
                  className="primary_button bg-blue hover:bg-darkerTeal mt-3 flex flex-shrink-0 items-center space-x-4 rounded px-4 py-2 transition duration-300"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </button>
              )}
            </section>
          </div>
        </div>
        {selectedType.length > 0 && (
          <div className="w-full overflow-x-auto">
            <div className="custom-grid">
              {selectedType.map((filtered, i) => (
                <FilterTag
                  key={i}
                  filtered={filtered}
                  onDelete={handleDeleteFilter}
                />
              ))}
            </div>
          </div>
        )}
      </section>
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
