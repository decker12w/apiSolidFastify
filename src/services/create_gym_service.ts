import { GymsRepository } from '@/repositories/gyms_repository'
import { Gym } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

interface CreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
  gym: Gym
}

@injectable()
export class CreateGymService {
  constructor(
    @inject('GymsRepository') private gymsRepository: GymsRepository,
  ) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
