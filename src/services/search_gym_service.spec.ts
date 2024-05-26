import 'reflect-metadata'
import { InMemoryGymsRepositories } from '@/repositories/in-memory/in_memory_gyms_repositories'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsService } from './search_gym_service'

let gymsRepository: InMemoryGymsRepositories
let sut: SearchGymsService

describe('Search gym service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym 2',
      description: null,
      phone: null,
      latitude: -27.2092952,
      longitude: -49.6411091,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym 21',
      }),
      expect.objectContaining({
        title: 'JavaScript Gym 22',
      }),
    ])
  })
})
