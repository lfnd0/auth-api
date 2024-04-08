import { User } from '../../entities/user'

export interface UsersRepository {
  create(data: User): Promise<User>
  findUserById(id: string): Promise<User>
  findUserByEmailAndCpfCnpj(email: string, cpfCnpj: string): Promise<boolean>
  findUserByEmailOrCpfCnpj(
    email?: string,
    cpfCnpj?: string,
  ): Promise<User | undefined>
}
