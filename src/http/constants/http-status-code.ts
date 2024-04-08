const httpStatusCode = {
  ok: {
    statusCode: 200,
    description: 'OK',
  },
  created: {
    statusCode: 201,
    description: 'Created',
  },
  badRequest: {
    statusCode: 400,
    description: 'Bad Request',
  },
  unauthorized: {
    statusCode: 401,
    description: 'Unauthorized',
  },
  notFound: {
    statusCode: 404,
    description: 'Not Found',
  },
  conflict: {
    statusCode: 409,
    description: 'Conflict',
  },
  internalServerError: {
    statusCode: 500,
    description: 'Internal Server Error',
  },
}

export const {
  ok,
  created,
  badRequest,
  unauthorized,
  notFound,
  conflict,
  internalServerError,
} = httpStatusCode
