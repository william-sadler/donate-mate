import request from 'superagent'
import { Types } from '../../models/modelTypes'

const rootUrl = '/api/v1'

export async function getTypesById(id: number): Promise<Types[]> {
  const res = await request.get(`${rootUrl}/types/${id}`)
  return res.body as Types[]
}
