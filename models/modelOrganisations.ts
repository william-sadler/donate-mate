export interface Organisation {
  id: number
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
