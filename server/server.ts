import express from 'express'
import * as Path from 'node:path'
import routeTypes from './routes/routeTypes'
import usersRoutes from './routes/routeUsers.ts'
import organisationRoutes from './routes/routeOrganisations.ts'
import routeAllTypes from './routes/routeAllTypes.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/alltypes', routeAllTypes)
server.use('/api/v1/types', routeTypes)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/organisations', organisationRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
