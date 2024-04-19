import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { SessionUseCase } from '../session'

export function makeSessionUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const sessionUseCase = new SessionUseCase(usersRepository)

  return sessionUseCase
}
