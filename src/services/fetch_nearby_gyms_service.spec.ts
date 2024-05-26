import 'reflect-metadata'
import { InMemoryGymsRepositories } from '@/repositories/in-memory/in_memory_gyms_repositories'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsService } from './fetch_nearby_gyms_service'

let gymsRepository: InMemoryGymsRepositories
let sut: FetchNearbyGymsService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym', // Certifique-se de que o título corresponde exatamente ao esperado
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near gym',
      }),
    ])
  })
})
