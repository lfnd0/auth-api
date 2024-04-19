import { User } from '../../entities/user'

export interface UsersRepository {
  create(userData: Partial<User>): Promise<User>
  fetchSession(id: string): Promise<boolean>
  updateSession(id: string, hasActiveSession: boolean): Promise<void>
  findUserById(id: string): Promise<User | null>
  findUserByEmailOrCpfCnpj(
    email?: string,
    cpfCnpj?: string,
  ): Promise<User | null>
}
