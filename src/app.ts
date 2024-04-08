import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { appErrorHandler } from './http/errors/app-error-handler'
import { authRoutes, rootRoutes, userRoutes } from './http/routes'

export const app = fastify({
  logger: {
    level: 'info',
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(rootRoutes)
app.register(userRoutes, { prefix: '/api/users' })
app.register(authRoutes, { prefix: '/api/auth' })

app.setErrorHandler((error, _, reply) => {
  appErrorHandler(error, _, reply)
})
