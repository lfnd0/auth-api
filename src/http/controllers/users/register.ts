import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterUseCase } from '../../../use-cases/users/factories/make-register-use-case'
import { created } from '../../constants/http-status-code'
import { registerBodySchema } from '../../schemas'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { body } = request
  const { name, email, cpfCnpj, password } = registerBodySchema.parse(body)

  const registerUseCase = makeRegisterUseCase()

  await registerUseCase.execute({
    name,
    email,
    cpfCnpj,
    password,
  })

  return reply.status(created.statusCode).send()
}
