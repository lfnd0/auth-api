import { UsersRepository } from '../../repositories/users/users-repository'
import { UserNotFound } from '../users/errors'

interface SessionUseCaseRequest {
  userId: string
}

export class SessionUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ userId }: SessionUseCaseRequest) {
    const hasUser = await this.usersRepository.findUserById(userId)

    if (!hasUser) {
      throw new UserNotFound()
    }

    const hasSession = await this.usersRepository.fetchSession(userId)

    return {
      hasSession,
    }
  }
}
