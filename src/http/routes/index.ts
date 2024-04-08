import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/auth/authenticate'
import { root } from '../controllers/root'
import { profile } from '../controllers/users/profile'
import { register } from '../controllers/users/register'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function rootRoutes(app: FastifyInstance) {
  app.get('/api', root)
}

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', authenticate)
}

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', register)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
