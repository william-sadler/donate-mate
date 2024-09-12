import request from 'superagent'
import { logError } from './utils.ts'
import { User, UserData } from '../../models/modelUsers'

const rootUrl = '/api/v1'

interface GetUsersFunction {
  token: string
}

export async function getUsers({
  token,
}: GetUsersFunction): Promise<User | null> {
  return await request
    .get(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.users ? res.body.users : null))
    .catch(logError)
}

interface AddUserFunction {
  newUser: UserData
  token: string
}
export async function addUser({
  newUser,
  token,
}: AddUserFunction): Promise<UserData> {
  return request
    .post(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body.users)
    .catch(logError)
}
