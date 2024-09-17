import { useOrganisationsById } from '../hooks/useOrganisations'
import { useParams } from 'react-router-dom'
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from '@react-google-maps/api'
import { API_HOST } from '../env.ts'
import { useState, useEffect } from 'react'

const mapContainer = {
  width: '22rem',
  height: '20rem',
}

interface LatLng {
  lat: number
  lng: number
}

interface Props {
  initial: LatLng
  mode?: string // Add mode prop for easter egg
}

export default function ProfileMap({ initial, mode }: Props) {
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

  // Check if the mode is "moon" to show the moon overlay
  const isMoonMode = mode === 'moon'

  return (
    <section className="map teal-shadow border-1 container m-2 mb-10 h-auto w-96 border border-darkerTeal border-opacity-25 px-8 py-6">
      <h3 className="heading-4">Where to find us</h3>
      <LoadScript googleMapsApiKey={API_HOST}>
        <GoogleMap mapContainerStyle={mapContainer} center={center} zoom={15}>
          <Marker position={center} />
          {isMoonMode && (
            <OverlayView
              position={center}
              mapPaneName={OverlayView.OVERLAY_LAYER}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: `url('https://w7.pngwing.com/pngs/618/70/png-transparent-moon-moon-atmosphere-monochrome-sphere.png') repeat center`,
                  width: '10000px',
                  height: '10000px',
                  opacity: 1, // Semi-transparent
                }}
              />
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    </section>
  )
}
