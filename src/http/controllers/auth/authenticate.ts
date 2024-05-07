import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthenticateUseCase } from '../../../use-cases/auth/factories/make-authenticate-use-case'
import { ok } from '../../constants/http-status-code'
import { authenticateBodySchema } from '../../schemas'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { body } = request
  const { email, cpfCnpj, password } = authenticateBodySchema.parse(body)

  const authenticateUseCase = makeAuthenticateUseCase()

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
      },
    },
  )

  return reply.status(ok.statusCode).send({ token })
}
