import request from 'superagent'
import { logError } from './utils.ts'
import { User, UserData } from '../../models/modelUsers.ts'

const rootUrl = '/api/v1/pendingusers'

interface GetUsersFunction {
  id: number
  token: string
}

export async function getPendingUsers({
  id,
  token,
}: GetUsersFunction): Promise<User> {
  return await request
    .get(`${rootUrl}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body ? res.body : null))
    .catch(logError)
}

interface AddUserFunction {
  newUser: UserData
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
