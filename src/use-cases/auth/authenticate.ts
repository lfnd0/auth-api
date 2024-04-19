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

    const hasUser = await this.authRepository.findUserByEmailOrCpfCnpj(
      email,
      cpfCnpj,
    )

    if (!hasUser) {
      throw new InvalidCredentialsError()
    }

    const checkPassword = await compare(password, hasUser.password)

    if (!checkPassword) {
      throw new InvalidCredentialsError()
    }

    await this.authRepository.updateSession(hasUser.id, true)

    return {
      user: {
        id: hasUser.id!,
        cpfCnpj: hasUser.cpfCnpj,
      },
    }
  }
}
