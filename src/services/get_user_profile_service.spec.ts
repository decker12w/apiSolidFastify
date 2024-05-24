import 'reflect-metadata'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in_memory_users_repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileService } from './get_user_profile_service'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource_not_found_error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const { name, email, password_hash } = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.string.alpha(6),
    }

    const { id } = await usersRepository.create({
      name,
      email,
      password_hash: await hash(password_hash, 6),
    })

    const { user } = await sut.execute({ userId: id })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ userId: 'fake_id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
