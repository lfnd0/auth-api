import fastify from 'fastify'
import { userRoutes } from './http/routes'

export const app = fastify({
  logger: {
    level: 'info',
  },
})

app.register(userRoutes)
