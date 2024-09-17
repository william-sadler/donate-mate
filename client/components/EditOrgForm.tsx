import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import EditCard from './EditCard.tsx'
import { Organisation } from '../../models/modelOrganisations.ts'
import { useOrganisationsById } from '../hooks/useOrganisations.ts'
import EditHowToDonate from './EditHowToDonate.tsx'
import EditCurrentlyAccepting from './EditCurrentlyAccepting.tsx'
import EditAbout from './EditAbout.tsx'
import { useTypesById } from '../hooks/useTypes.ts'
import { Types } from '../../models/modelTypes.ts'
import AddressSearch, { addressState } from './AddressSearch.tsx'

interface Props {
  organisation: Organisation
  orgDonationTypes: Types[]
  onUpdate: (id: number) => void
  onClose: () => void
}

type FormState = {
  orgName: string
  orgContactEmail: string | null
  orgContactNumber: string | null
  orgAbout: string
  orgLocation: string
  orgLongitude: number | null
  orgLatitude: number | null
  orgTypes: string
  orgImage: string
  orgVolunteeringNeeded: boolean
  orgMethod: string
  orgWebsite: string | null
  orgDonationTypes: Types[] | []
  orgDonationTypesDeleted: Types[] | []
}

export default function EditOrgForm({
  orgDonationTypes,
  organisation,
  onUpdate,
  onClose,
}: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const [form, setForm] = useState<FormState>({
    orgName: organisation.name,
    orgContactEmail: organisation.contactEmail || null,
    orgContactNumber: organisation.contactNumber || null,
    orgAbout: organisation.about,
    orgLocation: organisation.location,
    orgLongitude: organisation.longitude || 174.77557,
    orgLatitude: organisation.latitude || -41.28664,
    orgTypes: organisation.orgTypes,
    orgImage: organisation.image,
    orgVolunteeringNeeded: false,
    orgMethod: organisation.donationMethod || '',
    orgWebsite: organisation.website || null,
    orgDonationTypes: orgDonationTypes,
    orgDonationTypesDeleted: [],
  })

  const [changed, setChanged] = useState(false)

  const org = useOrganisationsById(organisation.id)
  const donationTypes = useTypesById(organisation.id)

  const handleMutationSuccess = () => {
    onUpdate(organisation.id)
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
  }

  if (org.isPending || donationTypes.isPending) {
    return <p>You are loved 💖...</p>
  }

  if (org.isError || donationTypes.isError) {
    return (
      <p>
        uh oh, something went wrong...{' '}
        {org.error?.message || donationTypes.error?.message}
      </p>
    )
  }

  const handleSubmit = async (
    event?:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    if (event) {
      event.preventDefault()
      if (!changed) {
        return setChanged(true)
      }
    }

    if (event?.currentTarget?.name === 'Delete') return

    if (!changed) {
      return setChanged(true)
    }

    const orgData = {
      id: organisation.id,
      name: form.orgName,
      contactEmail: form.orgContactEmail,
      contactNumber: form.orgContactNumber,
      location: form.orgLocation,
      about: form.orgAbout,
      longitude: form.orgLongitude,
      latitude: form.orgLatitude,
      orgTypes: form.orgTypes,
      image:
        typeof form.orgImage === 'string'
          ? form.orgImage
          : (form.orgImage as File).name,
      volunteeringNeeded: form.orgVolunteeringNeeded,
      donationMethod: form.orgMethod,
      website: form.orgWebsite,
    }

    // Check if image is a File object
    const formData = new FormData()
    formData.append('orgData', JSON.stringify(orgData))
    formData.append('orgImage', form.orgImage || new File([], ''))

    if (form.orgDonationTypes) {
      donationTypes.patchTypesData.mutate({
        id: organisation.id,
        token: token,
        typeData: form.orgDonationTypes,
      })
    }
    if (form.orgDonationTypes) {
      donationTypes.postTypesData.mutate({
        id: organisation.id,
        token: token,
        typeData: form.orgDonationTypes,
      })
    }
    if (form.orgDonationTypesDeleted) {
      donationTypes.deleteTypesData.mutate({
        id: organisation.id,
        token: token,
        typeData: form.orgDonationTypesDeleted,
      })
    }
    org.patchOrgData.mutate(
      {
        id: organisation.id,
        token: token,
        orgData: formData,
      },
      mutationOptions,
    )
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value, type, files } = event.target as HTMLInputElement &
      HTMLTextAreaElement
    if (type === 'file') {
      if (files && files[0]) {
        setForm({
          ...form,
          [name]: files[0], // Update the form state with the file
        })
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      })
    }
  }

  const handleTypeChange = (typeData: Types[], deletedData?: Types[]) => {
    setForm({
      ...form,
      orgDonationTypes: typeData,
      orgDonationTypesDeleted:
        deletedData === undefined ? form.orgDonationTypesDeleted : deletedData,
    })
  }

  const handleMapData = (addresss: addressState) => {
    setForm({
      ...form,
      orgLocation: addresss.name,
      orgLatitude: addresss.lat,
      orgLongitude: addresss.lng,
    })
  }

  return (
    <>
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
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-green-600"
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
                        Save Changes
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to Save?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
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
      <form
        onSubmit={handleSubmit}
        className={`mx-auto max-w-7xl px-1 py-10 sm:py-10 md:ml-5 lg:mt-0 lg:px-1 xl:ml-10 2xl:mx-auto ${changed ? 'grid cursor-not-allowed grid-cols-1 gap-4 blur-sm md:grid-cols-3 lg:grid-cols-4' : 'grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'}`}
      >
        <section className="col-span-1 md:col-span-1 lg:col-span-1">
          <EditCard
            form={organisation}
            orgName={form.orgName}
            orgContactEmail={form.orgContactEmail}
            orgContactNumber={form.orgContactNumber}
            handleChange={handleChange}
            orgLocation={form.orgLocation}
            orgWebsite={form.orgWebsite || ''}
          />
          <button
            onClick={handleSubmit}
            className="m-2 rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md ring-1 ring-inset ring-green-500 transition duration-300 hover:bg-green-200/50"
          >
            Save
          </button>
          <button
            onClick={(event) => {
              event.preventDefault()
              return onClose()
            }}
            className="mt-2 rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md ring-1 ring-inset ring-red-500 transition duration-300 hover:bg-red-200/50"
          >
            Close
          </button>
        </section>
        <section className="col-span-1 flex flex-col gap-4 md:col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <EditAbout orgAbout={form.orgAbout} handleChange={handleChange} />
            <EditCurrentlyAccepting
              orgId={organisation.id}
              form={form.orgDonationTypes}
              deleted={form.orgDonationTypesDeleted}
              handleUpdate={handleTypeChange}
            />
          </div>
        </section>
        <section className="flex hidden flex-col gap-4 md:block lg:col-span-1">
          <EditHowToDonate
            orgHowToDonate={form.orgMethod}
            handleChange={handleChange}
          />
          <div className="mt-4">
            <section className="hidden md:block ">
              <AddressSearch
                intitial={{
                  lat: form.orgLatitude || -41.28664,
                  lng: form.orgLongitude || 174.77557,
                }}
                onUpdate={handleMapData}
              />
            </section>
          </div>
        </section>
        <section className="col-span-1 flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          <div className="block md:hidden">
            <EditHowToDonate
              orgHowToDonate={form.orgMethod}
              handleChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <section className="block md:hidden">
              <AddressSearch
                intitial={{
                  lat: form.orgLatitude || -41.28664,
                  lng: form.orgLongitude || 174.77557,
                }}
                onUpdate={handleMapData}
              />
            </section>
          </div>
        </section>
      </form>
    </>
  )
}
