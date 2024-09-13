import { useNavigate, useParams } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'
import CurrentlyAccepting from '../components/ProfileCurrentlyAccepting'
import { useTypes } from '../hooks/useTypes'
import ProfileAbout from '../components/ProfileAbout'
import ProfileCard from '../components/ProfileCard'
import CardUrgentlyStatus from '../components/VolunteersNeeded'

export default function OrgProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const numericId = Number(id)

  const { data, isPending, isError, error, failureCount } =
    useOrganisationsById(numericId)
  const {
    data: typeData,
    isPending: isTypePending,
    isError: isTypeError,
    failureCount: typeFailureCount,
  } = useTypes(numericId)

  if (isPending || isTypePending) {
    const failures = failureCount > 0 ? ` (failed ${failureCount} times)` : ''
    const typeFailures =
      typeFailureCount > 0 ? ` (failed ${typeFailureCount} times)` : ''
    if (failureCount > 3 || typeFailureCount > 3) {
      navigate('/')
      return null
    }
    return (
      <div>
        Loading...{failures}
        {typeFailures}
      </div>
    )
  }

  if (isError || isTypeError) {
    return <p>Failed to get Org: {error?.message || 'Unknown error'}</p>
  }

  if (!data || !typeData) {
    return <p>No data available</p>
  }

  return (
    <>
      <ProfileCard
        image={data.image}
        name={data.name}
        contactDetails={data.contactDetails}
      />

      <h3>{data.orgTypes}</h3>
      <p>{data.contactDetails}</p>
      <p>{data.method}</p>
      <div>
        <ProfileAbout about={data.about} />
      </div>

      <CurrentlyAccepting typeData={typeData} />
      <CardUrgentlyStatus id={numericId} />
    </>
  )
}
