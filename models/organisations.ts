export interface Organisation {
  id: number
  name: string
  contact_details: string
  about: string
  longitude: number
  latitude: number
  org_types: string
  image: string
  volunteering_needed: boolean
  method?: string
}
