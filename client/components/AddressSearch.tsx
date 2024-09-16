import { useState, useEffect, useRef } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { API_HOST } from '../env.ts'

interface LatLng {
  lat: number
  lng: number
}

const containerStyle = {
  width: '100%',
  height: '400px',
}

export interface addressState {
  name: string
  street_address: string
  city: string
  state: string
  zip_code: string
  googleMapLink: string
  lat: number
  lng: number
}

interface Props {
  intitial: LatLng
  onUpdate: (address: addressState) => void
}

export default function AddressSearch({ intitial, onUpdate }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    googleMapLink: '',
    lat: intitial.lat,
    lng: intitial.lng,
  })

  const [mapCenter, setMapCenter] = useState<LatLng>(intitial)
  const [markerPosition, setMarkerPosition] = useState<LatLng>(intitial)
  const autocompleteRef = useRef<HTMLInputElement>(null)
  const geocoder = useRef<google.maps.Geocoder | null>(null)
  const placeId = useRef<string | null>(null)

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        geocoder.current = new window.google.maps.Geocoder()

        const autocomplete = new window.google.maps.places.Autocomplete(
          autocompleteRef.current!,
          {
            types: ['address'],
            fields: [
              'address_components',
              'name',
              'place_id',
              'formatted_address',
              'geometry',
            ],
          },
        )

        const handlePlaceChange = () => {
          const place = autocomplete.getPlace()
          if (!place.address_components || !place.geometry) return

          const addressComponents = place.address_components.reduce(
            (acc: { [key: string]: string }, component) => {
              const { types, long_name, short_name } = component
              if (types.includes('street_number')) acc.street_number = long_name
              if (types.includes('route')) acc.street_route = long_name
              if (types.includes('locality')) acc.city = long_name
              if (types.includes('administrative_area_level_1'))
                acc.state = short_name
              if (types.includes('postal_code')) acc.zip_code = long_name
              return acc
            },
            {},
          )

          // Save place ID for Place Details API request
          placeId.current = place.place_id || ''

          // Update map center and marker position
          const location = place.geometry.location as google.maps.LatLng

          // Update form data
          setFormData({
            name: place.name || '',
            street_address: `${addressComponents.street_number || ''} ${addressComponents.street_route || ''}`,
            city: addressComponents.city || '',
            state: addressComponents.state || '',
            zip_code: addressComponents.zip_code || '',
            googleMapLink: '', // Will be updated after fetching place details
            lat: location.lat(),
            lng: location.lng(),
          })

          setMapCenter({
            lat: location.lat(),
            lng: location.lng(),
          })
          setMarkerPosition({
            lat: location.lat(),
            lng: location.lng(),
          })

          // Fetch place details
          if (placeId.current) {
            fetchPlaceDetails(placeId.current)
          }
        }

        autocomplete.addListener('place_changed', handlePlaceChange)

        return () => {
          google.maps.event.clearInstanceListeners(autocomplete)
        }
      }
    }

    if (window.google && window.google.maps) {
      loadGoogleMapsApi()
    } else {
      const intervalId = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(intervalId)
          loadGoogleMapsApi()
        }
      }, 100) // Check every 100ms

      return () => clearInterval(intervalId)
    }
  }, [])

  const fetchPlaceDetails = (placeId: string) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div'), // dummy element
    )
    service.getDetails({ placeId: placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        const googleMapLink = place.url || ''

        setFormData((prevData) => ({
          ...prevData,
          googleMapLink: googleMapLink,
        }))
      } else {
        console.error('Place Details request failed due to:', status)
      }
    })
  }

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const latLng = event.latLng.toJSON()
      setMarkerPosition(latLng)
      setMapCenter(latLng)

      if (geocoder.current) {
        geocoder.current.geocode({ location: latLng }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const place = results[0]
            const addressComponents = place.address_components || []

            const addressData = addressComponents.reduce(
              (acc: { [key: string]: string }, component) => {
                const { types, long_name, short_name } = component
                if (types.includes('street_number'))
                  acc.street_number = long_name
                if (types.includes('route')) acc.street_route = long_name
                if (types.includes('locality')) acc.city = long_name
                if (types.includes('administrative_area_level_1'))
                  acc.state = short_name
                if (types.includes('postal_code')) acc.zip_code = long_name
                return acc
              },
              {},
            )
            const location = place.geometry.location as google.maps.LatLng
            const formattedAddress = place.formatted_address || ''
            const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`

            setFormData({
              name: formattedAddress || '',
              street_address: `${addressData.street_number || ''} ${addressData.street_route || ''}`,
              city: addressData.city || '',
              state: addressData.state || '',
              zip_code: addressData.zip_code || '',
              googleMapLink: googleMapLink,
              lat: location.lat(),
              lng: location.lng(),
            })
          } else {
            console.error('Geocoder failed due to:', status)
          }
        })
      }
    }
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('Form submitted:', formData)
    onUpdate(formData)
  }

  return (
    <div className="mx-auto w-96 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative">
        <div className="m-6">
          <LoadScript googleMapsApiKey={API_HOST} libraries={['places']}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={13}
              onClick={handleMapClick}
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform rounded-md bg-white p-2 shadow-md">
          <input
            id="autocomplete"
            ref={autocompleteRef}
            className="focus:ring-blue-500 w-80 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2"
            type="text"
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            placeholder="Enter address"
          />
          <button
            onClick={handleSubmit}
            className="focus:ring-blue-500 mt-2 w-full rounded-md bg-blue p-2 text-white hover:bg-blue focus:outline-none focus:ring-2"
          >
            Submit
          </button>
        </div>
        {formData.googleMapLink && (
          <div className="mt-4">
            <a
              href={formData.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View on Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
