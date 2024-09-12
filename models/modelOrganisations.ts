export interface Organisation {
  id: number
  name: string
  contactDetails: string
  about: string
  longitude: number
  latitude: number
  orgTypes: string
  volunteeringNeeded: boolean
  method?: string
}
