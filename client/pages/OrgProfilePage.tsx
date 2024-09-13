import { useNavigate, useParams } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'
import CurrentlyAccepting from '../components/ProfileCurrentlyAccepting'
import { useTypes } from '../hooks/useTypes'
import ProfileCard from '../components/ProfileCard.tsx'
import ProfileAbout from '../components/ProfileAbout.tsx'

export default function OrgProfilePage() {
  const param = useParams()
  const navigate = useNavigate()
  const id = Number(param.id)
  const { data, isPending, isError, error, failureCount } =
    useOrganisationsById(id)
  const typeData = useTypes(id)

  if (isPending || !data) {
    let failures = ''
    if (failureCount > 0) {
      failures = ` (failed ${failureCount} times)`
    }
    if (failureCount > 3) {
      navigate('/')
    }
    return <div>Loading... {failures}</div>
  }

  if (isError) {
    return <p>Failed to get Org: {error.message}</p>
  }

  if (typeData.isPending || !typeData.data) {
    let failures = ''
    if (typeData.failureCount > 0) {
      failures = ` (failed ${typeData.failureCount} times)`
    }
    if (typeData.failureCount > 3) {
      navigate('/')
    }
    return <div>Loading... {failures}</div>
  }

  if (typeData.isError) {
    return <p>Failed to get Org: {typeData.error.message}</p>
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
      <ProfileAbout about={data.about} />

      <CurrentlyAccepting typeData={typeData.data} />
    </>
  )
}
