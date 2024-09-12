import db from './connection.ts'
import { Organisation } from '../../models/organisations.ts'

export async function getAllOrganisations() {
  const organisations = await db('organisations').select()
  return organisations as Organisation[]
}
