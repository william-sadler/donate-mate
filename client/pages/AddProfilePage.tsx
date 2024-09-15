import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUsers } from '../hooks/useUsers'
import AddOrgForm from '../components/AddOrgForm'
import {
  useAllOrganisations,
  useOrganisationsById,
} from '../hooks/useOrganisations'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/modelUsers'

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
  const [changed, setChanged] = useState(false)
  const orgTemp = useOrganisationsById(1)
  const allOrgs = useAllOrganisations()
  const queryClient = useQueryClient()
  const { user } = useAuth0()

  const isUser = useUsers()

  useEffect(() => {
    const handleOnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      return ''
    }
    window.addEventListener('beforeunload', handleOnBeforeUnload, {
      capture: true,
    })
    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload, {
        capture: true,
      })
    }
  }, [])

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
    return <div>Its Working!... {failures}</div>
  }

  if (isUser.isPending) {
    let failures = ''
    if (isUser.failureCount > 0) {
      failures = ` (failed ${isUser.failureCount} times)`
    }
    if (isUser.failureCount > 3) {
      navigate('/')
    }
    return <div>Hmmm, suspicious... {failures}</div>
  }

  let fetchStatus = ''
  if (orgTemp.isPending) fetchStatus = 'Updating...'
  if (orgTemp.isRefetching) fetchStatus = 'Refreshing...'

  if (orgTemp.error instanceof Error) {
    return <div>Failed to load organisation: {orgTemp.error.message}</div>
  }
  if (isUser.error instanceof Error) {
    return <div>Failed to load user: {isUser.error.message}</div>
  }
  if (allOrgs.error instanceof Error) {
    return <div>Failed to load organisations: {allOrgs.error.message}</div>
  }

  const userCheck = isUser.data as User

  if (!user) {
    navigate('/')
  }

  if (
    allOrgs.data?.find((org) => org.id === (userCheck ? userCheck.orgId : null))
  ) {
    navigate(
      `/org/${allOrgs.data?.find((org) => org.id === (userCheck ? userCheck.orgId : null))?.id}`,
    )
  }

  return (
    <>
      {error !== '' && <button onClick={hideError}>Error: {error}</button>}
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      {changed && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="custom-svg mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Leave Page
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to Leave Page? Your form will be
                          lost!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={() => navigate('/')}
                    type="button"
                    className="custom-button"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setChanged(false)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {orgTemp.isSuccess && orgTemp.data !== undefined && allOrgs.isSuccess && (
        <AddOrgForm
          newOrgId={allOrgs.data[allOrgs.data.length - 1].id + 1}
          organisation={organisation}
          onUpdate={handleUpdate}
          onClose={() => (!changed ? setChanged(true) : null)}
        />
      )}
    </>
  )
}
