import request from 'superagent'
import { Organisation } from '../../models/organisations'

const orgURL = '/api/v1/organisation'

export async function getAllOrganisations(): Promise<Organisation[]> {
  const res = await request.get(orgURL)
  return res.body
}

export async function getOrganisationsById(id: number): Promise<Organisation> {
  const res = await request.get(orgURL + `/${id}`)
  return res.body
}
