import connection from './connection.js'
import { User, UserData, UserDBData } from '../../models/modelUsers.ts'

export async function getUserByToken(auth0Id: string): Promise<User> {
  return await connection('users')
    .where('auth0Id', auth0Id)
    .first('*', 'org_id as orgId', 'is_owner as isOwner')
}

export async function getAllUsersByToken(
  auth0Id: string,
  orgId: number,
): Promise<UserData[]> {
  const userCheck = await connection('users')
    .where('org_id', orgId)
    .andWhere('auth0Id', auth0Id)
    .first()

  if (!userCheck) {
    throw new Error('User does not have permission')
  }

  if (!(userCheck.org_id === orgId)) {
    throw new Error('User does not have permission')
  }

  return await connection('users')
    .where('org_id', orgId)
    .select('name', 'email', 'is_owner as isOwner')
}

export async function postUser(
  auth0Id: string,
  userData: UserDBData,
): Promise<void> {
  const userCheck = await connection('users').where('auth0Id', auth0Id).first()

  if (userCheck) {
    throw new Error('User already added')
  }

  return await connection('users').insert({
    auth0Id: auth0Id,
    name: userData.name,
    email: userData.email,
    org_id: userData.orgId,
    is_owner: userData.isOwner || false,
  })
}

export async function postUserByAccept(
  auth0Id: string,
  userData: User,
): Promise<void> {
  const userCheck = await connection('users')
    .where('org_id', userData.orgId)
    .andWhere('auth0Id', userData.auth0Id)
    .first()

  if (userCheck) {
    throw new Error('User already added')
  }

  await connection('pending_users')
    .where('auth0Id', userData.auth0Id)
    .andWhere('org_id', userData.orgId)
    .delete()

  return await connection('users').insert({
    auth0Id: userData.auth0Id,
    name: userData.name,
    email: userData.email,
    org_id: userData.orgId,
    is_owner: false,
  })
}
