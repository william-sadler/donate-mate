import { Router } from 'express'

import * as db from '../db/dbOrganisations.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const fruits = await db.getAllOrganisations()

    res.json({ fruits: fruits.map((fruit) => fruit.name) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const fruit = await db.getOrganisationsById(req.params.id)
    res.json(fruit)
  } catch (err) {
    next(err)
  }
})
