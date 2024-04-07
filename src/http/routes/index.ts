import { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', register)
}
