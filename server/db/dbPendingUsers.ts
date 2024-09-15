import connection from './connection.js'
import { User, UserDBData } from '../../models/modelUsers.ts'

export async function getUserPendingById(
  auth0Id: string,
  orgId: number,
): Promise<User[]> {
  const userCheck = await connection('users').where('auth0Id', auth0Id).first()

  if (!userCheck) {
    throw new Error('User does not have permission')
  }

  if (!(userCheck.org_id === orgId)) {
    throw new Error('User does not have permission')
  }

  if (!userCheck.is_owner) {
    throw new Error('User does not have permission')
  }

  return await connection('pending_users')
    .where('org_id', orgId)
    .select('*', 'org_id as orgId')
}

export async function postPendingUser(
  auth0Id: string,
  userData: UserDBData,
): Promise<void> {
  const userCheck = await connection('pending_users')
    .where('auth0Id', auth0Id)
    .first()

  if (userCheck) {
    throw new Error('User already added')
  }

  return await connection('pending_users').insert({
    auth0Id: auth0Id,
    name: userData.name,
    email: userData.email,
    org_id: userData.orgId,
  })
}
