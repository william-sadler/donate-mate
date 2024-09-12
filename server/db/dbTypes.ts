import db from './connection.ts'
import { DonationNames, Types } from '../../models/modelTypes.ts'

export async function getTypesById(orgId: number): Promise<Types[]> {
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

export async function getAllDonationNames(): Promise<DonationNames[]> {
  const type = await db('donation_names').select()
  return type as DonationNames[]
}

export async function addType(data: Types) {
  const [id] = await db('donation_types').insert(data)
  return id
}
