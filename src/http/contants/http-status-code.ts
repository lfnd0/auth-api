const httpStatusCode = {
  ok: {
    statusCode: 200,
    message: 'OK',
  },
  created: {
    statusCode: 201,
    message: 'Created',
  },
  badRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  notFound: {
    statusCode: 404,
    message: 'Not Found',
  },
  internalServerError: {
    statusCode: 500,
    message: 'Internal Server Error',
  },
}

export const { ok, created, badRequest, notFound, internalServerError } =
  httpStatusCode
