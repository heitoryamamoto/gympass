import { randomUUID } from 'node:crypto'
import type { Prisma, User } from '@prisma/client'
import type { UsersRepository } from '../utils/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  // erro aqui

  async findById(id: string) {
    const user = this.items.find(item => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? 'MEMBER',
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
