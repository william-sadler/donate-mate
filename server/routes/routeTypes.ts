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

router.get('/all', async (req, res, next) => {
  console.log('what is going on')
  try {
    const typesNames = await db.getAllTypes()
    res.json(typesNames)
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

router.delete('/:id', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }
  const id = Number(req.params.id)

  if (!id || id < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  try {
    await db.deleteType(id)
    res.setHeader('Location', `${req.baseUrl}/${id}`).sendStatus(StatusCodes.OK)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  const id = Number(req.params.id)

  if (!id || id < 1) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }

  const typeData = req.body as Types[]

  if (!typeData[0]) {
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }
  console.log(typeData)
  try {
    await db.updateType(typeData, id)
    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})
