export interface Organisation {
  id: number
  name: string
  contact_details: string
  about: string
  longitude: number
  latitude: number
  org_types: string
  volunteering_needed: boolean
  method?: string
}
