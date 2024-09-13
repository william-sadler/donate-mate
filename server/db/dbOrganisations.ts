import db from './connection.ts'
import { Organisation } from '../../models/modelOrganisations.ts'

export async function getAllOrganisations() {
  const organisations = await db('organisations').select()
  return organisations as Organisation[]
}

export async function getOrganisationsById(id: number): Promise<Organisation> {
  const organisations = await db('organisations')
    .where({ id })
    .first(
      'id',
      'name',
      'contact_details as contactDetails',
      'about',
      'longitude',
      'latitude',
      'org_types as orgTypes',
      'volunteering_needed as volunteeringNeeded',
      'method',
    )
  return organisations as Organisation
}

export async function patchOrganisationsById(
  id: number,
  orgData: Organisation,
): Promise<void> {
  await db('organisations').where({ id }).update({
    name: orgData.name,
    contact_details: orgData.contactDetails,
    about: orgData.about,
    longitude: orgData.longitude,
    latitude: orgData.latitude,
    org_types: orgData.orgTypes,
    image: orgData.image,
    volunteering_needed: orgData.volunteeringNeeded,
    method: orgData.method,
  })
}
