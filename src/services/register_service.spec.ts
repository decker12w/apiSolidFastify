import { describe } from 'node:test'
import { expect, it } from 'vitest'
import { RegisterService } from './register_service'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in_memory_users_repository'
import { faker } from '@faker-js/faker'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user_already_exists_error'

describe('Register Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const userMock = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.string.alpha(6),
    }

    const { user } = await registerService.create(userMock)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const userMock = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.string.alpha(6),
    }

    const { user } = await registerService.create(userMock)

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

    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.create(userMock)
    await expect(() => registerService.create(userMock)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
