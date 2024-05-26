import { inject, injectable } from 'tsyringe'
import { GymsRepository } from '@/repositories/gyms_repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsServiceResponse {
  gyms: Gym[]
}
@injectable()
export class FetchNearbyGymsService {
  constructor(
    @inject('GymsRepository')
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
