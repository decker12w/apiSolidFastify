import { CheckInsRepository } from '@/repositories/check-ins_repository'
import { CheckIn } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

interface CheckInServiceRequest {
  userId: string
  gymId: string
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

@injectable()
export class CheckInService {
  constructor(
    @inject('CheckInsRepository')
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
