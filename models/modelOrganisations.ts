export interface Organisation {
  id: number
  name: string
  contactEmail: string | null
  contactNumber: string | null
  location: string
  about: string
  longitude: number | null
  latitude: number | null
  orgTypes: string
  image: string
  volunteeringNeeded: boolean
  donationMethod: string | null
  website?: string
}
