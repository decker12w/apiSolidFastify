import 'reflect-metadata'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in_memory_users_repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateService } from './authenticate_service'
import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid_credentials_error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should authenticate', async () => {
    const userMock: Omit<User, 'id' | 'created_at'> = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.string.alpha(6),
    }

    await usersRepository.create({
      name: userMock.name,
      email: userMock.email,
      password_hash: await hash(userMock.password_hash, 6),
    })

    const { user } = await sut.execute({
      email: userMock.email,
      password: userMock.password_hash,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid email', async () => {
    const userMock: Omit<User, 'id' | 'created_at'> = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.string.alpha(6),
    }

    expect(() =>
      sut.execute({
        email: userMock.email,
        password: userMock.password_hash,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userMock: Omit<User, 'id' | 'created_at'> = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.string.alpha(6),
    }

    await usersRepository.create({
      name: userMock.name,
      email: userMock.email,
      password_hash: await hash(userMock.password_hash, 6),
    })

    expect(() =>
      sut.execute({
        email: userMock.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
