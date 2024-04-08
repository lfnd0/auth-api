import { FastifyReply, FastifyRequest } from 'fastify'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../../../use-cases/auth/authenticate'
import { ok } from '../../constants/http-status-code'
import { authenticateBodySchema } from '../../schemas'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { body } = request
  const { email, cpfCnpj, password } = authenticateBodySchema.parse(body)

  const usersRepositoy = new InMemoryUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepositoy)

  const { user } = await authenticateUseCase.execute({
    email,
    cpfCnpj,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
        expiresIn: '1m',
      },
    },
  )

  return reply.status(ok.statusCode).send({ token })
}
