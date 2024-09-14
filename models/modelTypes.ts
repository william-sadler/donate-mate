export interface Types {
  id: number
  name: string
  accepting: boolean
  urgentlySeeking: boolean
  organisationId: number
  date: string
}

export interface DonationNames {
  id: number
  name: string
}

export interface TypesData {
  id: number
  name: string
  accepting: boolean
  urgently_seeking?: boolean
  organisation_id?: number
  date: string
}
