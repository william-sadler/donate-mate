import db from './connection.ts'
import { Organisation } from '../../models/modelOrganisations.ts'

export async function getAllOrganisations() {
  const organisations = await db('organisations').select(
    'id',
    'name',
    'contact_email as contactEmail',
    'contact_number as contactNumber',
    'location',
    'about',
    'longitude',
    'latitude',
    'org_types as orgTypes',
    'image',
    'volunteering_needed as volunteeringNeeded',
    'donation_method as donationMethod',
    'website',
  )
  return organisations as Organisation[]
}

export async function getOrganisationsById(id: number): Promise<Organisation> {
  const organisations = await db('organisations')
    .where({ id })
    .first(
      'id',
      'name',
      'contact_email as contactEmail',
      'contact_number as contactNumber',
      'location',
      'about',
      'longitude',
      'latitude',
      'org_types as orgTypes',
      'image',
      'volunteering_needed as volunteeringNeeded',
      'donation_method as donationMethod',
      'website',
    )
  return organisations as Organisation
}

export async function patchOrganisationsById(
  id: number,
  orgData: Organisation,
): Promise<void> {
  await db('organisations').where({ id }).update({
    name: orgData.name,
    contact_email: orgData.contactEmail,
    contact_number: orgData.contactNumber,
    location: orgData.location,
    about: orgData.about,
    longitude: orgData.longitude,
    latitude: orgData.latitude,
    org_types: orgData.orgTypes,
    image: orgData.image,
    volunteering_needed: orgData.volunteeringNeeded,
    donation_method: orgData.donationMethod,
    website: orgData.website,
  })
}

export async function postOrganisation(orgData: Organisation): Promise<number> {
  const [id] = await db('organisations').insert({
    name: orgData.name,
    contact_email: orgData.contactEmail,
    contact_number: orgData.contactNumber,
    location: orgData.location,
    about: orgData.about,
    longitude: orgData.longitude,
    latitude: orgData.latitude,
    org_types: orgData.orgTypes,
    image: orgData.image,
    volunteering_needed: orgData.volunteeringNeeded,
    donation_method: orgData.donationMethod,
    website: orgData.website,
  })
  return id
}
