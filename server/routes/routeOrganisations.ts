import { Router } from 'express'

import * as db from '../db/dbOrganisations.ts'
import { StatusCodes } from 'http-status-codes'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = Router()

export default router

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!id || id < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    const org = await db.getOrganisationsById(id)

    if (!org) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    res.json(org)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET /api/v1/organisation/
router.get('/', async (req, res) => {
  try {
    const organisations = await db.getAllOrganisations()

    res.json(organisations)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const id = Number(req.params.id)
  const orgData = req.body

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('unauthorised')
  }

  if (!id || id < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  if (!orgData) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    await db.patchOrganisationsById(id, orgData)

    res.sendStatus(StatusCodes.OK)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const orgData = req.body

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('unauthorised')
  }

  if (!orgData) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    const id = await db.postOrganisation(orgData)
    res.json(id)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
