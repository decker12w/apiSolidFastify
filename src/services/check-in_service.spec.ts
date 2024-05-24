import 'reflect-metadata'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in_memory_check-ins_repository'
import { CheckInService } from '@/services/check-in_service'
import { beforeEach, describe, expect, it } from 'vitest'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check In Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in twice in the same day', async () => {
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
