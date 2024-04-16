import { FastifyRequest } from 'fastify'
import { DecodePayloadType } from '../../@types/decode-payload-type'
import { InvalidCredentialsError } from '../../use-cases/auth/erros'
import { makeLogoutUseCase } from '../../use-cases/auth/factories/make-logout-use-case'
import { makeSessionUseCase } from '../../use-cases/auth/factories/make-session-use-case'

export async function verifyJwtAndActiveUserSession(request: FastifyRequest) {
  try {
    await request.jwtVerify()

    const sessionUseCase = makeSessionUseCase()
    const { hasSession } = await sessionUseCase.execute({
      userId: request.user.sub,
    })

    if (!hasSession) {
      throw new InvalidCredentialsError()
    }
  } catch (error) {
    const decodePayload: DecodePayloadType = await request.jwtDecode({
      verify: { complete: true },
      decode: { complete: true },
    })

    const logoutUseCase = makeLogoutUseCase()
    await logoutUseCase.execute({ userId: decodePayload.payload.sub })

    throw new InvalidCredentialsError()
  }
}
