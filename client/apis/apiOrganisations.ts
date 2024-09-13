import request from 'superagent'
import { Organisation } from '../../models/modelOrganisations'
import { UserData } from '../../models/modelUsers'

const orgURL = '/api/v1/organisations'

export async function getAllOrganisations(): Promise<Organisation[]> {
  const res = await request.get(orgURL)
  return res.body
}

export async function getOrganisationsById(id: number): Promise<Organisation> {
  const res = await request.get(orgURL + `/${id}`)
  return res.body
}

interface PatchOrgFunction {
  id: number
  token: string
  orgData: Organisation
}

interface PostOrgFunction {
  userData: UserData
  token: string
  orgData: Organisation
}

export async function patchOrganisationById({
  id,
  token,
  orgData,
}: PatchOrgFunction): Promise<void> {
  await request
    .get(orgURL + `/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(orgData)
}

export async function postOrganisation({
  userData,
  token,
  orgData,
}: PostOrgFunction): Promise<void> {
  const res = await request
    .post(orgURL)
    .set('Authorization', `Bearer ${token}`)
    .send(orgData)

  await request
    .post(`/api/v1/users${res.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(userData)
}
