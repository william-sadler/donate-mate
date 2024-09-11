import { Router } from 'express'

import * as db from '../db/dbOrganisations.ts'

const router = Router()

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

export default router
