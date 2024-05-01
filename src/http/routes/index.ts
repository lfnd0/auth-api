import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/auth/authenticate'
import { logout } from '../controllers/auth/logout'
import { register } from '../controllers/auth/register'
import { root } from '../controllers/root'
import { profile } from '../controllers/users/profile'
import { verifyJwtAndActiveUserSession } from '../middlewares/verify-jwt-active-user-session'

export async function rootRoutes(app: FastifyInstance) {
  app.get(
    '/api',
    {
      schema: {
        tags: ['Root'],
        response: {
          200: {
            description: 'Success',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    root,
  )
}

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/sign-up',
    {
      schema: {
        summary: 'Sign up user',
        description: 'Sign up user',
        tags: ['Auth'],
        body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            cpfCnpj: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
        response: {
          201: {
            description: 'Created',
            type: 'null',
          },
          400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
              },
              error: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
            },
          },
          409: {
            description: 'Conflict',
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
              },
              error: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    register,
  )
  app.post(
    '/sign-in',
    {
      schema: {
        summary: 'Log in user',
        tags: ['Auth'],
        body: {
          type: 'object',
          properties: {
            cpfCnpj: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
        response: {
          200: {
            description: 'OK',
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
          401: {
            description: 'Invalid credentials',
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
              },
              error: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
            },
            example: {
              statusCode: 401,
              error: 'Unauthorized',
              message: 'Invalid credentials',
            },
          },
        },
      },
    },
    authenticate,
  )
  app.patch(
    '/sign-out',
    {
      onRequest: [verifyJwtAndActiveUserSession],
      schema: {
        summary: 'Log out user',
        tags: ['Auth'],
        security: [{ authorization: [] }],
      },
    },
    logout,
  )
}

export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/me',
    {
      onRequest: [verifyJwtAndActiveUserSession],
      schema: {
        summary: 'Fetch user profile',
        tags: ['Users'],
        security: [{ authorization: [] }],
      },
    },
    profile,
  )
}
