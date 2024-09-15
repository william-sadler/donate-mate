import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/dbTypes.ts'
import { Types } from '../../models/modelTypes.ts'

const router = Router()

export default router

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  if (!id) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }
  try {
    const type = await db.getTypesById(id)
    res.json(type)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const DonationNames = await db.getAllDonationNames()
    res.json(DonationNames)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const data = req.body
    await db.addType(data)
    res.sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

router.delete('/', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  const typeData = req.body as Types[]

  if (!typeData[0]) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    await db.deleteType(typeData)
    res.sendStatus(StatusCodes.OK)
  } catch (err) {
    next(err)
  }
})

router.patch('/', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }
  const typeData = req.body as Types[]

  if (!typeData[0]) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }
  try {
    await db.updateType(typeData)
    res.sendStatus(StatusCodes.OK)
  } catch (err) {
    next(err)
  }
})
