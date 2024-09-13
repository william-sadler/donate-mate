import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUsers } from '../hooks/useUsers'
import AddOrgForm from '../components/AddOrgForm'
import {
  useAllOrganisations,
  useOrganisationsById,
} from '../hooks/useOrganisations'

const organisation = {
  name: '',
  contactDetails: '',
  about: '',
  longitude: 0,
  latitude: 0,
  image: '/images/placeholder-image.webp',
  orgTypes: '',
  volunteeringNeeded: false,
  method: '',
}

export default function AddProfilePage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const orgTemp = useOrganisationsById(1)
  const allOrgs = useAllOrganisations()
  const queryClient = useQueryClient()

  const user = useUsers()

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Unknown error')
    }
  }

  const handleUpdate = async (id: number) => {
    try {
      queryClient.invalidateQueries()
      navigate(`/org/${id}`)
    } catch (error) {
      handleError(error)
    }
  }

  const hideError = () => {
    setError('')
  }

  if (orgTemp.isPending || !orgTemp.data || allOrgs.isPending) {
    let failures = ''
    if (orgTemp.failureCount > 0) {
      failures = ` (failed ${orgTemp.failureCount} times)`
    }
    if (orgTemp.failureCount > 3) {
      navigate('/')
    }
    return <div>Loading... {failures}</div>
  }

  if (user.isPending || !user.data || allOrgs.isPending) {
    let failures = ''
    if (user.failureCount > 0) {
      failures = ` (failed ${user.failureCount} times)`
    }
    if (user.failureCount > 3) {
      navigate('/')
    }
    return <div>Loading... {failures}</div>
  }

  let fetchStatus = ''
  if (orgTemp.isPending) fetchStatus = 'Updating...'
  if (orgTemp.isRefetching) fetchStatus = 'Refreshing...'

  if (orgTemp.error instanceof Error) {
    return <div>Failed to load organisation: {orgTemp.error.message}</div>
  }
  if (user.error instanceof Error) {
    return <div>Failed to load user: {user.error.message}</div>
  }
  if (allOrgs.error instanceof Error) {
    return <div>Failed to load organisations: {allOrgs.error.message}</div>
  }

  return (
    <>
      {error !== '' && <button onClick={hideError}>Error: {error}</button>}
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      <Link to={`/org`}>
        <button>Close</button>
      </Link>
      {orgTemp.isSuccess && orgTemp.data !== undefined && allOrgs.isSuccess && (
        <AddOrgForm
          newOrgId={allOrgs.data[allOrgs.data.length - 1].id + 1}
          organisation={organisation}
          onUpdate={handleUpdate}
        />
      )}
    </>
  )
}
