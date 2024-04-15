import { fastifyJwt } from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { env } from './env'
import { appErrorHandler } from './http/errors/app-error-handler'
import { authRoutes, rootRoutes, userRoutes } from './http/routes'
import { swaggerOpenAPIOptions } from './libs/swagger-openai-options'
import { swaggerUiOptions } from './libs/swagger-ui-options'

export const app = fastify({
  logger: {
    level: 'info',
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.setErrorHandler((error, _, reply) => {
  appErrorHandler(error, _, reply)
})

app.register(fastifySwagger, swaggerOpenAPIOptions)

app.register(fastifySwaggerUi, swaggerUiOptions)

app.register(rootRoutes)
app.register(authRoutes, { prefix: '/api/auth' })
app.register(userRoutes, { prefix: '/api/users' })
