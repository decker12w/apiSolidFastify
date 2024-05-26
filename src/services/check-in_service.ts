import { CheckInsRepository } from '@/repositories/check-ins_repository'
import { GymsRepository } from '@/repositories/gyms_repository'
import { CheckIn } from '@prisma/client'
import { getDistanceBetweenCoordinates } from '@/utils/get_distance_between_coordinates'
import { ResourceNotFoundError } from '@/services/errors/resource_not_found_error'
import { inject, injectable } from 'tsyringe'
import { MaxDistanceError } from './errors/max_distance_error'
import { MaxNumberCheckInsError } from './errors/max_number_check-ins_error'

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}
@injectable()
export class CheckInService {
  constructor(
    @inject('CheckInsRepository')
    private chekInRepository: CheckInsRepository,
    @inject('GymsRepository')
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.chekInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberCheckInsError()
    }

    const checkIn = await this.chekInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
