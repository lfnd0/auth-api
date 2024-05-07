import { FastifyReply, FastifyRequest } from 'fastify'
import { makeLogoutUseCase } from '../../../use-cases/auth/factories/make-logout-use-case'
import { noContent } from '../../constants/http-status-code'

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  const logoutUseCase = makeLogoutUseCase()

  await logoutUseCase.execute({ userId: request.user.sub })

  reply.status(noContent.statusCode).send({
    message: noContent.description,
  })
}
