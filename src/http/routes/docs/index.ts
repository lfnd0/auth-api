import { RouteShorthandOptions } from 'fastify'

export const rootDocs: RouteShorthandOptions = {
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
}

export const signUpDocs: RouteShorthandOptions = {
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
}

export const signInDocs: RouteShorthandOptions = {
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
}

export const signOutDocs: RouteShorthandOptions = {
  schema: {
    summary: 'Log out user',
    tags: ['Auth'],
    security: [{ authorization: [] }],
  },
}

export const meDocs: RouteShorthandOptions = {
  schema: {
    summary: 'Fetch user profile',
    tags: ['Users'],
    security: [{ authorization: [] }],
  },
}
