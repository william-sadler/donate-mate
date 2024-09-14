import { getOrganisationsById } from '../apis/apiOrganisations'
import { useParams } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { GOOGLE_API_ACCESS_KEY } from '../env'

export default function ProfileMap() {
  const params = useParams()
  const id = Number(params.id)
  const {
    data: org,
    error: mapFetchError,
    isPending: mapPending,
    isError: mapError,
  } = getOrganisationsById(id)

  console.log(org)

  if (!org || mapPending) {
    return <p>Locating organisation...</p>
  }
  if (mapError) {
    return <p>Error: {mapFetchError.message}</p>
  }

  return <p>READY TO MAP??</p>
}
