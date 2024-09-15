import express from 'express'
import * as Path from 'node:path'
import TypesRoute from './routes/routeTypes'
import usersRoutes from './routes/routeUsers.ts'
import organisationRoutes from './routes/routeOrganisations.ts'
import allTypesRoutes from './routes/routeAllTypes.ts'
import pendingUsersRoutes from './routes/routePendingUsers.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/alltypes', allTypesRoutes)
server.use('/api/v1/types', TypesRoute)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/pending', pendingUsersRoutes)
server.use('/api/v1/organisations', organisationRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
