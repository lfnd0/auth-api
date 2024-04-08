import { UsersRepository } from '../../repositories/users/users-repository'

interface ProfileUseCaseRequest {
  userId: string
}

interface ProfileUseCaseResponse {
  user: {
    id: string
    name: string
    cpfCnpj: string
    email: string
  }
}

export class ProfileUseCase {
  constructor(private usersRepositoy: UsersRepository) {}

  public async execute({
    userId,
  }: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {
    const { id, name, cpfCnpj, email } =
      await this.usersRepositoy.findUserById(userId)

    return {
      user: {
        id: id!,
        name,
        email,
        cpfCnpj,
      },
    }
  }
}
