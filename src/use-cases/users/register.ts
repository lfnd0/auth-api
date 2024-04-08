import { hash } from 'bcryptjs'
import { User } from '../../entities/user'
import { UsersRepository } from '../../repositories/users/users-repository'
import { UserAlreadyExistsError } from './errors'

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
  constructor(private usersRepositoy: UsersRepository) {}

  public async execute({
    name,
    email,
    cpfCnpj,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHashed = await hash(password, 8)

    const hasUser = await this.usersRepositoy.findUserByEmailOrCpfCnpj(
      email,
      cpfCnpj,
    )

    if (hasUser) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepositoy.create({
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
