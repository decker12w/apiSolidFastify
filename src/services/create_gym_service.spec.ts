import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymService } from './create_gym_service'
import { InMemoryGymsRepositories } from '@/repositories/in-memory/in_memory_gyms_repositories'

let gymsRepository: InMemoryGymsRepositories
let sut: CreateGymService

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
