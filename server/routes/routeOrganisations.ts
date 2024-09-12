import { Router } from 'express'

import * as db from '../db/dbOrganisations.ts'
import { StatusCodes } from 'http-status-codes'

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
