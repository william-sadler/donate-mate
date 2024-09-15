import { useNavigate, useParams } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUsers } from '../hooks/useUsers'
import EditOrgForm from '../components/EditOrgForm'
import { User } from '../../models/modelUsers'
import { useTypesById } from '../hooks/useTypes'

export default function EditProfilePage() {
  const navigate = useNavigate()
  const param = useParams()
  const id = Number(param.id)
  const [error, setError] = useState('')
  const [changed, setChanged] = useState(false)

  const queryClient = useQueryClient()

  const organisation = useOrganisationsById(id)
  const donationTypes = useTypesById(id)
  const user = useUsers()

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Unknown error')
    }
  }

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

  if (donationTypes.isPending) {
    let failures = ''
    if (donationTypes.failureCount > 0) {
      failures = ` (failed ${donationTypes.failureCount} times)`
    }
    if (donationTypes.failureCount > 3) {
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
  if (donationTypes.error instanceof Error) {
    return <div>Failed to load organisation: {donationTypes.error.message}</div>
  }
  const userCheck = user.data as User

  if (userCheck?.orgId !== id) {
    navigate(`/org/${id}`)
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
      {organisation.isSuccess && organisation.data !== undefined && (
        <EditOrgForm
          key={organisation.data.id}
          orgDonationTypes={donationTypes.data || []}
          organisation={organisation.data}
          onUpdate={handleUpdate}
          onClose={() => (!changed ? setChanged(true) : null)}
        />
      )}
    </>
  )
}
