import { FastifyReply, FastifyRequest } from 'fastify'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { ProfileUseCase } from '../../../use-cases/users/profile'
import { created } from '../../constants/http-status-code'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const usersRepositoy = new InMemoryUsersRepository()
  const registerUseCase = new ProfileUseCase(usersRepositoy)

  const { user } = await registerUseCase.execute({ userId: request.user.sub })

  return reply.status(created.statusCode).send(user)
}
