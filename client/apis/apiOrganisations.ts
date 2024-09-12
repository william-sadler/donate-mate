import request from 'superagent'
import { Organisation } from '../../models/organisations'

const orgURL = '/api/v1/organisations'

export async function getAllOrganisations(): Promise<Organisation[]> {
  const res = await request.get(orgURL + '/')
  return res.body
}
