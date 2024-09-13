export interface Organisation {
  id: number
  name: string
  contact_email: string | null
  contact_number: string | null
  location: string
  about: string
  longitude: number | null
  latitude: number | null
  org_types: string
  image: string
  volunteering_needed: boolean
  donation_method: string | null
  website?: string
}
