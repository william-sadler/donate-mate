import request from 'superagent'
import { logError } from './utils.ts'
import { User, UserData } from '../../models/modelUsers'

const rootUrl = '/api/v1'

interface GetUsersFunction {
  id?: number
  token: string
}

export async function getUsers({ token }: GetUsersFunction): Promise<User> {
  return await request
    .get(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body ? res.body : []))
    .catch(logError)
}

export async function getAllUsersById({
  id,
  token,
}: GetUsersFunction): Promise<UserData[]> {
  return await request
    .get(`${rootUrl}/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body ? res.body : []))
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

interface AddRequestFunction {
  admin: UserData
  newUser: User
  token: string
}

export async function acceptingUserRequest({
  admin,
  newUser,
  token,
}: AddRequestFunction): Promise<UserData> {
  const userPackage = { admin, newUser }

  return request
    .post(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(userPackage)
    .then((res) => res.body.users)
    .catch(logError)
}

export async function denyingUserRequest({
  admin,
  newUser,
  token,
}: AddRequestFunction): Promise<UserData> {
  const userPackage = { admin, newUser }

  return request
    .delete(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(userPackage)
    .then((res) => res.body.users)
    .catch(logError)
}
