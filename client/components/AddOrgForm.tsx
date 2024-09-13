import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Organisation,
  OrganisationData,
} from '../../models/modelOrganisations.ts'
import { useOrganisationsById } from '../hooks/useOrganisations.ts'
import AddCard from './AddCard.tsx'
import AddHowToAdd from './AddHowToAdd.tsx'
import AddCurrentlyAccepting from './AddCurrentlyAccepting.tsx'
import AddAbout from './AddAbout.tsx'
import { useTypesById } from '../hooks/useTypes.ts'
import { Types } from '../../models/modelTypes.ts'

interface Props {
  newOrgId: number
  organisation: OrganisationData
  onUpdate: (id: number) => void
}

type FormState = {
  orgName: string
  orgContactDetails: string
  orgAbout: string
  orgLongitude: number
  orgLatitude: number
  orgTypes: string
  orgImage: string
  orgVolunteeringNeeded: boolean
  orgMethod: string
  orgDonationTypes: Types[] | []
  orgDonationTypesDeleted: Types[] | []
}

export default function AddOrgForm({
  newOrgId,
  organisation,
  onUpdate,
}: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const [form, setForm] = useState<FormState>({
    orgName: '',
    orgContactDetails: '',
    orgAbout: '',
    orgLongitude: 0,
    orgLatitude: 0,
    orgTypes: '',
    orgImage: '',
    orgVolunteeringNeeded: false,
    orgMethod: '',
    orgDonationTypes: [],
    orgDonationTypesDeleted: [],
  })

  const orgQuery = useOrganisationsById(1)
  const donationTypes = useTypesById(1)

  const handleMutationSuccess = (id: number) => {
    onUpdate(id)
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
  }

  if (orgQuery.isPending || donationTypes.isPending) {
    return <p>You are loved 💖...</p>
  }

  if (orgQuery.isError || donationTypes.isError) {
    return (
      <p>
        uh oh, something went wrong...{' '}
        {orgQuery.error?.message || donationTypes.error?.message}
      </p>
    )
  }

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    if (event) {
      event.preventDefault()
    }
    orgQuery.addOrgData.mutate(
      {
        token: token,
        orgData: {
          id: newOrgId,
          name: form.orgName,
          contactDetails: form.orgContactDetails,
          about: form.orgAbout,
          longitude: organisation.longitude,
          latitude: organisation.latitude,
          orgTypes: form.orgTypes,
          image: form.orgImage,
          volunteeringNeeded: form.orgVolunteeringNeeded,
          method: form.orgMethod,
        },
      },
      mutationOptions,
    )
    if (form.orgDonationTypes) {
      donationTypes.patchOrgData.mutate({
        id: newOrgId,
        token: token,
        typeData: form.orgDonationTypes,
      })
    }
    if (form.orgDonationTypesDeleted) {
      donationTypes.deleteOrgData.mutate({
        id: newOrgId,
        token: token,
        typeData: form.orgDonationTypesDeleted,
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleTypeChange = (typeData: Types[]) => {
    setForm({
      ...form,
      orgDonationTypes: typeData,
    })
  }
  const handleTypeDelete = (typeData: Types[]) => {
    setForm({
      ...form,
      orgDonationTypesDeleted: typeData,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AddCard
          form={organisation}
          orgName={form.orgName}
          orgContactDetails={form.orgContactDetails}
          handleChange={() => handleChange}
        />
        <AddAbout
          form={organisation}
          orgAbout={form.orgAbout}
          handleChange={() => handleChange}
        />
        <AddHowToAdd
          form={organisation}
          orgHowToAdd={form.orgMethod}
          handleChange={() => handleChange}
        />
        <AddCurrentlyAccepting
          orgId={newOrgId}
          form={form.orgDonationTypes}
          orgDonationTypes={donationTypes.data}
          handleDelete={() => handleTypeDelete}
          handleUpdate={() => handleTypeChange}
        />
      </form>
    </>
  )
}
