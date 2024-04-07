import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { InMemoryUsersRepository } from '../../../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '../../../use-cases/users/register'
import {
  badRequest,
  created,
  internalServerError,
} from '../../contants/http-status-code'
import { loggerError } from '../../logs'
import { registerBodySchema } from '../../schemas'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { body } = request
    const { name, email, cpfCnpj, password } = registerBodySchema.parse(body)

    const usersRepositoy = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepositoy)

    const { user } = await registerUseCase.execute({
      name,
      email,
      cpfCnpj,
      password,
    })

    return reply.status(created.statusCode).send(user)
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = fromZodError(error).toString()
      loggerError(reply, errorMessage)

      return reply.status(badRequest.statusCode).send({
        statusCode: badRequest.statusCode,
        error: badRequest.message,
        message: errorMessage,
      })
    }

    loggerError(reply, internalServerError.message)

    return reply.status(internalServerError.statusCode).send({
      statusCode: internalServerError.statusCode,
      error: internalServerError.message,
    })
  }
}
