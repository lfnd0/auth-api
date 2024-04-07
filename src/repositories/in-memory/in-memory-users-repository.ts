import { randomUUID } from 'node:crypto'
import { User } from '../../entities/user'
import { UsersRepository } from '../users-repository'
import { usersTable } from './mocks/users-table'

export class InMemoryUsersRepository implements UsersRepository {
  async create(data: User): Promise<User> {
    const { name, email, cpfCnpj, password } = data
    const user = {
      id: randomUUID(),
      name,
      email,
      cpfCnpj,
      password,
      createdAt: new Date(),
      updateAt: null,
    }

    usersTable.push(user)

    return user
  }

  async findUserByEmailOrCpfCnpj(
    email: string,
    cpfCnpj: string,
  ): Promise<boolean> {
    const hasUser = usersTable.find(
      (user) => user.email === email && user.cpfCnpj === cpfCnpj,
    )
    return Boolean(hasUser)
  }
}
