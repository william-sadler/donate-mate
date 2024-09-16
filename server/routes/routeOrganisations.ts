import { Router } from 'express'
import * as db from '../db/dbOrganisations.ts'
import { StatusCodes } from 'http-status-codes'
import checkJwt, { JwtRequest } from '../auth0.ts'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const router = Router()
export default router

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

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

router.get('/', async (req, res) => {
  try {
    const organisations = await db.getAllOrganisations()
    res.json(organisations)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch(
  '/:id',
  upload.single('orgImage'),
  checkJwt,
  async (req: JwtRequest, res) => {
    const auth0Id = req.auth?.sub
    const id = Number(req.params.id)
    const orgData = req.body
    const orgImage = req.file

    if (!auth0Id || auth0Id === 'undefined') {
      console.error('No auth0Id')
      return res.status(401).send('unauthorized')
    }

    if (!id || id < 1) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    if (!orgData) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }
    // Process orgData
    const parsedOrgData = JSON.parse(orgData.orgData)

    try {
      // Retrieve the current organisation data
      const currentOrg = await db.getOrganisationsById(id)
      if (!currentOrg) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
      }

      // If a new image is uploaded, delete the old image
      if (orgImage) {
        parsedOrgData.image = `/images/${orgImage.filename}`

        // Determine the path of the old image to delete
        if (currentOrg.image) {
          const oldImagePath = path.join(
            process.cwd(), // This returns the root directory of your project
            'public',
            'images',
            path.basename(currentOrg.image),
          )
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Failed to delete old image:', err)
          })
        }
      } else {
        // Preserve the existing image path if no new image is uploaded
        parsedOrgData.image = currentOrg.image
      }

      await db.patchOrganisationsById(id, parsedOrgData)
      res.sendStatus(StatusCodes.OK)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

router.post(
  '/',
  upload.single('orgImage'),
  checkJwt,
  async (req: JwtRequest, res) => {
    const auth0Id = req.auth?.sub
    const orgData = req.body
    const orgImage = req.file

    if (!auth0Id || auth0Id === 'undefined') {
      console.error('No auth0Id')
      return res.status(401).send('unauthorised')
    }

    // Process orgData
    const parsedOrgData = JSON.parse(orgData.orgData)

    // Save the file URL/path
    if (orgImage) {
      parsedOrgData.image = `/images/${orgImage.filename}`
    }

    try {
      const id = await db.postOrganisation(parsedOrgData)
      res.json({ id })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
)
