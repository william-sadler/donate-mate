import { useOrganisationsById } from '../hooks/useOrganisations'
import { useParams } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { API_HOST } from '../env.ts'

const mapContainer = {
  width: '24rem',
  height: '20rem',
}

const defaultCenter = {
  lat: -41.28664,
  lng: 174.77557,
}

export default function ProfileMap() {
  const params = useParams()
  const id = Number(params.id)
  const {
    data: orgData,
    error: mapFetchError,
    isPending: mapPending,
    isError: mapError,
  } = useOrganisationsById(id)

  console.log(orgData)
  console.log(API_HOST)

  if (!orgData || mapPending) {
    return <p>Locating organisation...</p>
  }
  if (mapError) {
    return <p>Error: {mapFetchError.message}</p>
  }

  const center =
    orgData.latitude && orgData.longitude
      ? {
          lat: orgData.latitude,
          lng: orgData.longitude,
        }
      : defaultCenter

  return (
    <>
      <section className="map w-1/7">
        <h3 className="heading-4">Where to find us</h3>
        <LoadScript googleMapsApiKey={API_HOST}>
          <GoogleMap mapContainerStyle={mapContainer} center={center} zoom={15}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </section>
    </>
  )
}
