import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/dbUsers.ts'

const router = Router()
export default router

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
