import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/dbPendingUsers.ts'
import { User } from '../../models/modelUsers.ts'
import { getUserByToken } from '../db/dbUsers.ts'

const router = Router()
export default router

// GET user

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0id')
    return res.status(401).send('unauthorised')
  }

  const data = await getUserByToken(auth0Id)

  if (!data?.orgId || data?.orgId < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    const users = await db.getUserPendingById(auth0Id, data.orgId)
    res.json(users as User[])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
})

// GET user By Id

router.get('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0id')
    return res.status(401).send('unauthorised')
  }

  const orgId = Number(req.params.id)

  if (!orgId || orgId < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    const users = await db.getUserPendingById(auth0Id, orgId)
    res.json(users as User[])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
})

// POST newUser

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const { name, email, orgId } = req.body

  if (!auth0Id) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  if (!name) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  if (!email) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    await db.postPendingUser(auth0Id, {
      name,
      email,
      orgId,
      isOwner: false,
    })
    res.sendStatus(StatusCodes.CREATED)
  } catch (error) {
    console.error(error)
    res.status(500).send('failed to add new user')
  }
})

// POST newUser by Org Id

router.post('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const { name, email } = req.body
  const orgId = Number(req.params.id)

  if (!auth0Id) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  if (!orgId || orgId < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    await db.postPendingUser(auth0Id, {
      name,
      email,
      orgId,
      isOwner: false,
    })
    res.sendStatus(StatusCodes.CREATED)
  } catch (error) {
    console.error(error)
    res.status(500).send('failed to add new user')
  }
})
