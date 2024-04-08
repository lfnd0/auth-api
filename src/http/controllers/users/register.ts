import { FastifyReply, FastifyRequest } from 'fastify'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '../../../use-cases/users/register'
import { created } from '../../constants/http-status-code'
import { registerBodySchema } from '../../schemas'

export async function register(request: FastifyRequest, reply: FastifyReply) {
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
}
