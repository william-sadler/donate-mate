export interface User {
  auth0Id: string
  name: string
  email: string
  orgId: number
}

export interface UserData {
  name: string
  email: string
}

export interface UserDBData {
  name: string
  email: string
  org_id: number
}
