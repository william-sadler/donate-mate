import connection from './connection.js'
import { User, UserDBData } from '../../models/modelUsers.ts'

export async function getUserByToken(auth0Id: string): Promise<User> {
  return await connection('users')
    .where('auth0Id', auth0Id)
    .first('*', 'org_id as orgId')
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
  })
}
