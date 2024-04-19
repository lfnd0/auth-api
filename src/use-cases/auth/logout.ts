import { UsersRepository } from '../../repositories/users/users-repository'
import { UserNotFound } from '../users/errors'

interface LogoutUseCaseRequest {
  userId: string
}

export class LogoutUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ userId }: LogoutUseCaseRequest) {
    const hasUser = await this.usersRepository.findUserById(userId)

    if (!hasUser) {
      throw new UserNotFound()
    }

    await this.usersRepository.updateSession(hasUser.id, false)
  }
}
