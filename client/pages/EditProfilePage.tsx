import { Link, useNavigate, useParams } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUsers } from '../hooks/useUsers'
import EditOrgForm from '../components/EditOrgForm'

export default function EditProfilePage() {
  const navigate = useNavigate()
  const param = useParams()
  const id = Number(param.id)
  const [error, setError] = useState('')

  const queryClient = useQueryClient()

  const organisation = useOrganisationsById(id)
  const user = useUsers()

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Unknown error')
    }
  }

  const handleUpdate = async () => {
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

  if (organisation.isPending || !organisation.data) {
    let failures = ''
    if (organisation.failureCount > 0) {
      failures = ` (failed ${organisation.failureCount} times)`
    }
    if (organisation.failureCount > 3) {
      navigate('/')
    }
    return <div>Loading... {failures}</div>
  }

  if (user.isPending || !user.data) {
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
  if (organisation.isPending) fetchStatus = 'Updating...'
  if (organisation.isRefetching) fetchStatus = 'Refreshing...'

  if (organisation.error instanceof Error) {
    return <div>Failed to load organisation: {organisation.error.message}</div>
  }
  if (user.error instanceof Error) {
    return <div>Failed to load organisation: {user.error.message}</div>
  }

  if (user.data.orgId !== organisation.data.id) {
    navigate(`/org/${id}`)
  }

  return (
    <>
      {error !== '' && <button onClick={hideError}>Error: {error}</button>}
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      <Link to={`/org/${id}`}>
        <button>Close</button>
      </Link>
      {organisation.isSuccess && organisation.data !== undefined && (
        <EditOrgForm
          key={organisation.data.id}
          organisation={organisation.data}
          onUpdate={handleUpdate}
        />
      )}
    </>
  )
}
