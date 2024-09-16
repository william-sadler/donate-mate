import { Link, useNavigate, useParams } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'
import CurrentlyAccepting from '../components/ProfileCurrentlyAccepting'
import { useTypesById } from '../hooks/useTypes'
import ProfileAbout from '../components/ProfileAbout'
import ProfileCard from '../components/ProfileCard'
import VolunteersNeeded from '../components/VolunteersNeeded'
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
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-1 py-10 sm:py-10 md:grid-cols-3 lg:ml-20 lg:mt-0 lg:grid-cols-4 lg:px-1">
      <section className=" col-span-1 md:col-span-1 lg:col-span-1">
        <ProfileCard
          image={data.image}
          name={data.name}
          contactEmail={data.contactEmail || ''}
          contactNumber={data.contactNumber || ''}
          location={data.location}
          orgType={data.orgTypes}
        />
      </section>
      <section className="col-span-1 flex flex-col gap-4 md:col-span-1 lg:col-span-2">
        <ProfileAbout about={data.about} />
        <CurrentlyAccepting typeData={typeData.data} />
        <VolunteersNeeded id={id} />
      </section>
      <section className="flex hidden flex-col gap-4 md:block lg:col-span-1">
        <ProfileHowToDonate method={data.donationMethod || ''} />
        <div className="mt-4">
          <section className="hidden md:block ">
            <ProfileMap />
          </section>
        </div>
      </section>
      <section className="col-span-1 flex flex-col gap-4 md:col-span-2 lg:col-span-1">
        <div className="block md:hidden">
          <ProfileHowToDonate method={data.donationMethod || ''} />
        </div>
        <div className="mt-4">
          <section className="block md:hidden">
            <ProfileMap />
          </section>
        </div>
      </section>

      {userCheck?.orgId === id && (
        <Link to={`/org/edit/${id}`}>
          <button>Edit</button>
        </Link>
      )}
    </div>
  )
}
