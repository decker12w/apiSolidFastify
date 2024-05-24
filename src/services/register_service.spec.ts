import 'reflect-metadata'
import { describe } from 'node:test'
import { beforeEach, expect, it } from 'vitest'
import { RegisterService } from './register_service'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in_memory_users_repository'
import { faker } from '@faker-js/faker'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user_already_exists_error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const userMock = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.string.alpha(6),
    }

    const { user } = await sut.create(userMock)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const userMock = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.string.alpha(6),
    }

    const { user } = await sut.create(userMock)

    const isPasswordCorrecttlyHashed = await compare(
      userMock.password,
      user.password_hash,
    )

    expect(isPasswordCorrecttlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const emailMock = faker.internet.email()
    const userMock = {
      name: faker.person.fullName(),
      email: emailMock,
      password: faker.string.alpha(6),
    }

    await sut.create(userMock)
    await expect(() => sut.create(userMock)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
