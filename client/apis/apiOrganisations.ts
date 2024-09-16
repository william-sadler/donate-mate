import request from 'superagent'
import { Organisation } from '../../models/modelOrganisations'
import { UserData } from '../../models/modelUsers'

const orgURL = '/api/v1/organisations'

export async function getAllOrganisations(): Promise<Organisation[]> {
  const res = await request.get(orgURL)
  return res.body
}

export async function getOrganisationsById(id: number): Promise<Organisation> {
  const res = await request.get(`${orgURL}/${id}`)
  return res.body
}

interface PatchOrgFunction {
  id: number
  token: string
  orgData: FormData
}

interface PostOrgFunction {
  userData: UserData
  token: string
  formData: FormData
}

export async function patchOrganisationById({
  id,
  token,
  orgData,
}: PatchOrgFunction): Promise<void> {
  await request
    .patch(`${orgURL}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(orgData)
}

export async function postOrganisation({
  userData,
  token,
  formData,
}: PostOrgFunction): Promise<void> {
  console.log('Org Added')

  try {
    // Perform the POST request with FormData
    const res = await request
      .post(orgURL)
      .set('Authorization', `Bearer ${token}`)
      .send(formData) // Send the FormData

    const createdOrgId = res.body.id // Assuming the API returns the ID of the created organisation

    console.log(userData)
    await request
      .post(`/api/v1/users/${createdOrgId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
  } catch (error) {
    console.error('Error posting organisation:', error)
    throw error
  }
}
