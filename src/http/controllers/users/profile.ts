import { FastifyReply, FastifyRequest } from 'fastify'
import { makeProfileUseCase } from '../../../use-cases/users/factories/make-profile-use-case'
import { created } from '../../constants/http-status-code'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileUseCase = makeProfileUseCase()

  const { user } = await profileUseCase.execute({ userId: request.user.sub })

  return reply.status(created.statusCode).send(user)
}
