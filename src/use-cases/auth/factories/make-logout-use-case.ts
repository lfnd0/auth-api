import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { LogoutUseCase } from '../logout'

export function makeLogoutUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const logoutUseCase = new LogoutUseCase(usersRepository)

  return logoutUseCase
}
