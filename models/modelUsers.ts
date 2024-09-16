export interface User {
  auth0Id: string
  name: string
  email: string
  orgId: number
  isOwner: boolean
}

export interface UserData {
  name: string
  email: string
  isOwner: boolean
}

export interface UserDBData {
  name: string
  email: string
  orgId: number
  isOwner: boolean
}

export interface PendingUser {
  name: string
  email: string
  orgId: number
}
