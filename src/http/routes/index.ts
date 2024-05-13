import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/auth/authenticate'
import { logout } from '../controllers/auth/logout'
import { root } from '../controllers/root'
import { profile } from '../controllers/users/profile'
import { register } from '../controllers/users/register'
import { verifyJwtAndActiveUserSession } from '../middlewares/verify-jwt-active-user-session'
import { meDocs, rootDocs, signInDocs, signOutDocs, signUpDocs } from './docs'

export async function rootRoutes(app: FastifyInstance) {
  app.get('/api', { ...rootDocs }, root)
}

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/sign-up',
    {
      ...signUpDocs,
    },
    register,
  )
  app.post(
    '/sign-in',
    {
      ...signInDocs,
    },
    authenticate,
  )
  app.patch(
    '/sign-out',
    {
      onRequest: [verifyJwtAndActiveUserSession],
      ...signOutDocs,
    },
    logout,
  )
}

export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/me',
    {
      onRequest: [verifyJwtAndActiveUserSession],
      ...meDocs,
    },
    profile,
  )
}
