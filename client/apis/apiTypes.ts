import request from 'superagent'
import { DonationNames, Types } from '../../models/modelTypes'

const rootUrl = '/api/v1'

export async function getTypesById(id: number): Promise<Types[]> {
  const res = await request.get(`${rootUrl}/types/${id}`)
  return res.body as Types[]
}

export async function getAllTypes(): Promise<Types[]> {
  const res = await request.get(`${rootUrl}/alltypes`)
  return res.body as Types[]
}

export async function getAllDonationNames(): Promise<DonationNames[]> {
  const res = await request.get(`${rootUrl}/types`)
  return res.body as DonationNames[]
}

interface PatchTypesFunction {
  id: number
  token: string
  typeData: Types[]
}

export async function patchTypesById({
  token,
  typeData,
}: PatchTypesFunction): Promise<void> {
  const updateTypes = typeData.filter((type) => type.id !== 0)

  if (updateTypes.length === 0) {
    return
  }

  await request
    .patch(`${rootUrl}/types`)
    .set('Authorization', `Bearer ${token}`)
    .send(updateTypes)
}

export async function postTypes({
  token,
  typeData,
}: PatchTypesFunction): Promise<void> {
  const newTypes = typeData.filter((type) => type.id === 0)
  await request
    .post(`${rootUrl}/types`)
    .set('Authorization', `Bearer ${token}`)
    .send(newTypes)
}

export async function deleteTypesById({
  token,
  typeData,
}: PatchTypesFunction): Promise<void> {
  await request
    .delete(`${rootUrl}/types`)
    .set('Authorization', `Bearer ${token}`)
    .send(typeData)
}
