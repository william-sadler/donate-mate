import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/dbTypes.ts'

const router = Router()

export default router

router.get('/', async (req, res, next) => {
  try {
    const typesNames = await db.getAllTypes()
    res.json(typesNames).status(StatusCodes.OK)
  } catch (err) {
    next(err)
  }
})
