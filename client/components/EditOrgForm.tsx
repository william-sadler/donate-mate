import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import EditCard from './EditCard.tsx'
import { Organisation } from '../../models/modelOrganisations.ts'

interface Props {
  organisation: Organisation
  onUpdate: () => void
}

type FormState = {
  orgName: string
  orgContactDetails: string
}

export default function EditOrgForm({ organisation, onUpdate }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    orgName: '',
    orgContactDetails: '',
  })

  const handleMutationSuccess = () => {
    onUpdate()
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
  }

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    if (event) {
      event.preventDefault()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <EditCard
          form={organisation}
          orgName={form.orgName}
          orgContactDetails={form.orgContactDetails}
          handleChange={() => handleChange}
        />
      </form>
    </>
  )
}
