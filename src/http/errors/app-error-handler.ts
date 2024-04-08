import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { InvalidCredentialsError } from '../../use-cases/auth/erros'
import { UserAlreadyExistsError } from '../../use-cases/users/errors'
import {
  badRequest,
  conflict,
  internalServerError,
  unauthorized,
} from '../constants/http-status-code'
import { loggerError } from '../logs'

interface GenerateReplyProps {
  reply: FastifyReply
  statusCode: number
  statusCodeDescription: string
  message: string
  stack?: string
}

function generateReply({
  reply,
  statusCode,
  statusCodeDescription,
  message,
  stack,
}: GenerateReplyProps) {
  loggerError(reply, message, stack)

  return reply.status(statusCode).send({
    statusCode,
    error: statusCodeDescription,
    message,
  })
}

export function appErrorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    const { statusCode, description } = badRequest
    const errorMessage = fromZodError(error).toString()

    return generateReply({
      reply,
      statusCode,
      statusCodeDescription: description,
      message: errorMessage,
    })
  }

  if (error instanceof UserAlreadyExistsError) {
    const { statusCode, description } = conflict
    const { message } = error

    return generateReply({
      reply,
      statusCode,
      statusCodeDescription: description,
      message,
    })
  }

  if (error instanceof InvalidCredentialsError) {
    const { statusCode, description } = unauthorized
    const { message } = error

    return generateReply({
      reply,
      statusCode,
      statusCodeDescription: description,
      message,
    })
  }

  const { statusCode, description } = internalServerError
  const { message, stack } = error

  return generateReply({
    reply,
    statusCode,
    statusCodeDescription: description,
    message,
    stack,
  })
}
