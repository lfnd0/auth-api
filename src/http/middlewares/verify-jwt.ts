import { FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '../../use-cases/auth/erros'

export async function verifyJWT(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch (error) {
    throw new InvalidCredentialsError()
  }
}
