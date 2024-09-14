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

export async function addType(data: Types[]) {
  data.map(
    async (type: Types) =>
      await db('donation_types').insert({
        name: type.name,
        accepting: type.accepting,
        urgently_seeking: type.urgentlySeeking,
        organisation_id: type.organisationId,
        date: type.date,
      }),
  )
}

export async function updateType(data: Types[], orgId: number): Promise<void> {
  await db('donation_types').where('org_id', orgId).update(data)
}

export async function deleteType(typeId: number): Promise<void> {
  await db('donation_types').where('id', typeId).del()
}

export async function getAllTypes(): Promise<Types[]> {
  const type = await db('donation_types').select(
    'id',
    'name',
    'accepting',
    'urgently_seeking as urgentlySeeking',
    'organisation_id as organisationId',
    'date',
  )
  return type as Types[]
}
