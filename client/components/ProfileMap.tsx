import { useOrganisationsById } from '../hooks/useOrganisations'
import { useParams } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { API_HOST } from '../env.ts'
import { useState, useEffect } from 'react'

const mapContainer = {
  width: '100%',
  height: '50vh',
}

interface LatLng {
  lat: number
  lng: number
}

interface Props {
  initial: LatLng
}

export default function ProfileMap({ initial }: Props) {
  const params = useParams()
  const [center, setCenter] = useState<LatLng>({
    lat: 51.5074,
    lng: -0.1278,
  })

  useEffect(() => {
    if (initial && initial.lat && initial.lng) {
      setCenter({
        lat: initial.lat,
        lng: initial.lng,
      })
    }
  }, [initial])

  const id = Number(params.id)
  const {
    data: orgData,
    error: mapFetchError,
    isPending: mapPending,
    isError: mapError,
  } = useOrganisationsById(id)

  console.log('Map center:', center)
  console.log('API Key:', API_HOST)

  if (!orgData || mapPending) {
    return <p>Locating organisation...</p>
  }
  if (mapError) {
    return <p>Error: {mapFetchError.message}</p>
  }

  return (
    <section className="map w-1/3">
      <h3 className="heading-4">Where to find us</h3>
      <LoadScript googleMapsApiKey={API_HOST}>
        <GoogleMap mapContainerStyle={mapContainer} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </section>
  )
}
