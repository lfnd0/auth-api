import { UsersRepository } from '../../repositories/users/users-repository'
import { UserNotFound } from './errors'

interface ProfileUseCaseRequest {
  userId: string
}

interface ProfileUseCaseResponse {
  user: {
    id: string
    name: string
    cpfCnpj: string
    email: string
    hasActiveSession: boolean
  }
}

export class ProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    userId,
  }: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {
    const hasUser = await this.usersRepository.findUserById(userId)

    if (!hasUser) {
      throw new UserNotFound()
    }

    return {
      user: {
        id: hasUser.id!,
        name: hasUser.name,
        email: hasUser.email,
        cpfCnpj: hasUser.cpfCnpj,
        hasActiveSession: hasUser.hasActiveSession,
      },
    }
  }
}
