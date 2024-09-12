import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/dbUsers.ts'

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
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
})

// POST newUser

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const { name, email } = req.body

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
    await db.postUser(auth0Id, { name, email })
    res.sendStatus(StatusCodes.CREATED)
  } catch (error) {
    console.error(error)
    res.status(500).send('failed to add new user')
  }
})
