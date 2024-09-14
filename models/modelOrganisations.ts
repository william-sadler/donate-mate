export interface Organisation {
  id: number
  name: string
  contactEmail?: string
  contactNumber?: string
  location: string
  about: string
  longitude?: number
  latitude?: number
  orgTypes: string
  image: string
  volunteeringNeeded: boolean
  donationMethod?: string
  website?: string
}

export interface OrganisationData {
  name: string
  contactDetails: string
  about: string
  longitude: number
  latitude: number
  image: string
  orgTypes: string
  volunteeringNeeded: boolean
  method?: string
}
