import { User } from '../../entities/user'
import { prisma } from '../../libs/prisma'
import { UsersRepository } from '../users/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(userData: User): Promise<User> {
    const { name, email, cpfCnpj, password } = userData
    const user = await prisma.user.create({
      data: {
        name,
        email,
        cpfCnpj,
        password_hash: password,
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpfCnpj: user.cpfCnpj,
      password: user.password_hash,
      hasActiveSession: user.has_active_session,
      createdAt: user.created_at,
      updateAt: user.updated_at,
    }
  }

  async fetchSession(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (user?.has_active_session) {
      return true
    }

    return false
  }

  async updateSession(id: string, hasActiveSession: boolean): Promise<void> {
    await prisma.user.update({
      data: {
        has_active_session: hasActiveSession,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    })
  }

  async findUserById(id: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (userData) {
      return {
        id: userData.id,
        name: userData.name,
        cpfCnpj: userData.cpfCnpj,
        email: userData.email,
        hasActiveSession: userData.has_active_session,
        password: userData.password_hash,
        createdAt: userData.created_at,
        updateAt: userData.updated_at,
      }
    }

    return null
  }

  // async findUserByEmailAndCpfCnpj(
  //   email: string,
  //   cpfCnpj: string,
  // ): Promise<boolean> {
  //   const userData = await prisma.user.findFirst({
  //     where: {
  //       AND: [{ cpfCnpj }, { email }],
  //     },
  //   })

  //   if (userData) {
  //     return true
  //   }

  //   return false
  // }

  async findUserByEmailOrCpfCnpj(
    email?: string | undefined,
    cpfCnpj?: string | undefined,
  ): Promise<User | null> {
    const userData = await prisma.user.findFirst({
      where: {
        OR: [{ cpfCnpj }, { email }],
      },
    })

    if (userData) {
      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password_hash,
        hasActiveSession: userData.has_active_session,
        cpfCnpj: userData.cpfCnpj,
        createdAt: userData.created_at,
        updateAt: userData.updated_at,
      }
    }

    return null
  }
}
