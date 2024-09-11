import db from './connection.ts'
import { Types } from '../../models/modelTypes.ts'

export async function getAllTypes(orgId: number) {
  const type = await db('donation_types')
    .where('organisation_id', orgId)
    .select(
      'id',
      'name',
      'accepting',
      'urgently_seeking as urgentlySeeking',
      'organisation_id as organisationId',
      'date',
    )
  return type as Types[]
}

export async function getTypesById(id: number | string) {
  const type = await db('donation_types').where({ id }).first()
  return type as Types
}

export async function addType(data: Types) {
  const [id] = await db('donation_types').insert(data)
  return id
}
