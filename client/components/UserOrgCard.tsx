import { useNavigate } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'

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

  const organisation = org.data

  return (
    orgId &&
    organisation && (
      <button
        onClick={() => navigate(`/org/${orgId}`)}
        className="bg-blue-100 border-blue-200 hover:bg-blue-200 mb-6 cursor-pointer rounded-lg border p-4"
      >
        <img
          src={organisation.image || 'https://via.placeholder.com/512'}
          alt={organisation.name}
          className="h-24 w-24"
        />
        <h4 className="text-lg font-semibold">
          Organization: {organisation.name}
        </h4>
        <p className="text-gray-700">{organisation.about}</p>
      </button>
    )
  )
}
