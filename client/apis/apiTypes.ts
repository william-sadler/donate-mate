import request from 'superagent'
import { DonationNames, Types } from '../../models/modelTypes'

const rootUrl = '/api/v1'

export async function getTypesById(id: number): Promise<Types[]> {
  const res = await request.get(`${rootUrl}/types/${id}`)
  return res.body as Types[]
}

export async function getAllDonationNames(): Promise<DonationNames[]> {
  const res = await request.get(`${rootUrl}/types`)
  return res.body as DonationNames[]
}
