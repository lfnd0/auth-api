import { compare } from 'bcryptjs'
import { UsersRepository } from '../../repositories/users/users-repository'
import { InvalidCredentialsError } from './erros'

interface AuthenticateUseCaseRequest {
  email?: string
  cpfCnpj?: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: {
    id: string
    cpfCnpj: string
  }
}

export class AuthenticateUseCase {
  constructor(private authRepository: UsersRepository) {}

  public async execute({
    email,
    cpfCnpj,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    if (!email && !cpfCnpj) {
      throw new InvalidCredentialsError()
    }

    const user = await this.authRepository.findUserByEmailOrCpfCnpj(
      email,
      cpfCnpj,
    )

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      throw new InvalidCredentialsError()
    }

    return {
      user: {
        id: user.id!,
        cpfCnpj: user.cpfCnpj,
      },
    }
  }
}
