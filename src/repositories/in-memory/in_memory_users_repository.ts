import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user_repository'
import { faker } from '@faker-js/faker'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: faker.string.uuid(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
