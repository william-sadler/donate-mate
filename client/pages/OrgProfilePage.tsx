import { Link, useNavigate, useParams } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'
import CurrentlyAccepting from '../components/ProfileCurrentlyAccepting'
import { useTypesById } from '../hooks/useTypes'
import ProfileAbout from '../components/ProfileAbout'
import ProfileCard from '../components/ProfileCard'
import ProfileHowToDonate from '../components/ProfileHowToDonate'
import ProfileMap from '../components/ProfileMap'
import { useUsers } from '../hooks/useUsers'
import { User } from '@auth0/auth0-react'

export default function OrgProfilePage() {
  const param = useParams()
  const navigate = useNavigate()
  const id = Number(param.id)
  const { data, isPending, isError, error, failureCount } =
    useOrganisationsById(id)
  const typeData = useTypesById(id)
  const user = useUsers()

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

  const userCheck = user.data as User

  return (
    <div className="orgProfilePage">
      <ProfileCard
        image={data.image}
        name={data.name}
        contactEmail={data.contactEmail || ''}
        contactNumber={data.contactNumber || ''}
        location={data.location}
      />
      <h3 className="heading-4-italic">{data.orgTypes}</h3>
      <div>
        <ProfileAbout about={data.about} />
      </div>
      <div>
        <ProfileHowToDonate method={data.donationMethod || ''} />
      </div>
      <CurrentlyAccepting typeData={typeData.data} />
      <ProfileMap />
      {userCheck?.orgId === id && (
        <Link to={`/org/edit/${id}`}>
          <button>Edit</button>
        </Link>
      )}
    </div>
  )
}
