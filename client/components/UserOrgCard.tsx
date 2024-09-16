import { useNavigate } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'
import CardUrgentlyStatus from './CardUrgentlyStatus'
import CardTypes from './CardTypes'

interface Props {
  orgId: number | null
}

export default function UserOrgCard({ orgId }: Props) {
  const navigate = useNavigate()
  const org = useOrganisationsById(orgId ?? 0)

  if (org.isPending) {
    let failures = ''
    if (org.failureCount > 0) {
      failures = ` (failed ${org.failureCount} times)`
    }
    if (org.failureCount > 3) {
      navigate('/')
    }
    return <div className="text-red-500">Hmmm, suspicious... {failures}</div>
  }

  if (org.error instanceof Error) {
    return (
      <div className="text-red-500">
        Failed to load user: {org.error.message}
      </div>
    )
  }

  if (!org.data) {
    return null
  }

  const { image, name, location } = org.data

  return (
    orgId &&
    org.data && (
      <div className="h-90 m-auto w-60 cursor-pointer overflow-hidden rounded-lg shadow-lg md:w-80">
        <img src={image} alt={name} className="max-h-40 w-full object-cover" />
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500">Organization</p>
          <p className="mb-2 text-xl font-medium text-gray-800">{name}</p>
          <p className="text-md font-light text-gray-400">{location}</p>
          <div className="mt-4 flex flex-wrap items-center justify-start">
            <CardTypes id={orgId} />
          </div>
          <CardUrgentlyStatus id={orgId} />
        </div>
      </div>
    )
  )
}
