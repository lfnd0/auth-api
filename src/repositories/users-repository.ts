import { User } from '../entities/user'

export interface UsersRepository {
  create(data: User): Promise<User>
  findUserByEmailOrCpfCnpj(email: string, cpfCnpj: string): Promise<boolean>
}
