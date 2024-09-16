import request from 'superagent'
import { logError } from './utils.ts'
import { PendingUser, User, UserData } from '../../models/modelUsers.ts'

const rootUrl = '/api/v1/pending'

interface GetUsersFunction {
  id?: number
  token: string
}

export async function getPendingUsers({
  id,
  token,
}: GetUsersFunction): Promise<User[]> {
  if (!id) {
    return await request
      .get(`${rootUrl}`)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => (res.body ? res.body : []))
      .catch(logError)
  } else {
    return await request
      .get(`${rootUrl}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => (res.body ? res.body : []))
      .catch(logError)
  }
}

interface AddUserFunction {
  newUser: PendingUser
  token: string
}

export async function addPendingUsers({
  newUser,
  token,
}: AddUserFunction): Promise<UserData> {
  return request
    .post(`${rootUrl}`)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body.users)
    .catch(logError)
}
