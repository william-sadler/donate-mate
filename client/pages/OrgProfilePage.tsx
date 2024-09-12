import { useNavigate, useParams } from 'react-router-dom'
import { useOrganisationsById } from '../hooks/useOrganisations'

export default function OrgProfilePage() {
  const param = useParams()
  const navigate = useNavigate()
  const id = Number(param.id)
  const { data, isPending, isError, error, failureCount } =
    useOrganisationsById(id)

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

  return (
    <>
      <h2>{data.name}</h2>
      <h3>{data.orgTypes}</h3>
      <p>{data.contactDetails}</p>
      <p>{data.method}</p>
      <p>{data.about}</p>
    </>
  )
}
