import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/dbUsers.ts'
import { User, UserData } from '../../models/modelUsers.ts'

const router = Router()
export default router

// GET user

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0id')
    return res.status(401).send('unauthorised')
  }

  try {
    const users = await db.getUserByToken(auth0Id)
    res.json(users as User)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
})

router.get('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const orgId = Number(req.params.id)

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0id')
    return res.status(401).send('unauthorised')
  }

  if (!orgId || orgId < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    const users = await db.getAllUsersByToken(auth0Id, orgId)
    res.json(users as UserData[])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
})

// POST newUser

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const { admin, newUser } = req.body as { admin: UserData; newUser: User }

  if (!auth0Id) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  if (!admin) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  if (!newUser) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    await db.postUserByAccept(auth0Id, newUser)
    res.sendStatus(StatusCodes.CREATED)
  } catch (error) {
    console.error(error)
    res.status(500).send('failed to add new user')
  }
})

// DELETE newUser

router.delete('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const { admin, newUser } = req.body as { admin: UserData; newUser: User }

  if (!auth0Id) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  if (!admin) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  if (!newUser) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    await db.deleteUserByDeny(auth0Id, newUser)
    res.sendStatus(StatusCodes.CREATED)
  } catch (error) {
    console.error(error)
    res.status(500).send('failed to add new user')
  }
})

// POST newUser by Org Id

router.post('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const { name, email, isOwner } = req.body
  const orgId = Number(req.params.id)

  if (!auth0Id) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  if (!orgId || orgId < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    await db.postUser(auth0Id, { name, email, orgId, isOwner })
    res.sendStatus(StatusCodes.CREATED)
  } catch (error) {
    console.error(error)
    res.status(500).send('failed to add new user')
  }
})
