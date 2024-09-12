export interface Organisation {
  id: number
  name: string
  contactDetails: string[]
  about: string
  location: string
  image: string
  orgTypes: string
  volunteeringNeeded: boolean
  method?: string
  website?: string
  donationType: string
  acceptingDonations: boolean
  urgentlySeeking: boolean
}
