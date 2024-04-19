import { hash } from 'bcryptjs'
import { User } from '../../entities/user'
import { UsersRepository } from '../../repositories/users/users-repository'
import { UserAlreadyExistsError } from './erros'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cpfCnpj: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    name,
    email,
    cpfCnpj,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const hasUser = await this.usersRepository.findUserByEmailOrCpfCnpj(
      email,
      cpfCnpj,
    )

    if (hasUser) {
      throw new UserAlreadyExistsError()
    }

    const passwordHashed = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      cpfCnpj,
      password: passwordHashed,
    })

    return {
      user,
    }
  }
}
