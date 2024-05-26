import { CheckInsRepository } from '@/repositories/check-ins_repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from '@/services/errors/resource_not_found_error'
import { inject, injectable } from 'tsyringe'
import dayjs from 'dayjs'
import { LateCheckInValidateError } from './errors/late_check-in_validate_error'

interface ValidateCheckInServiceRequest {
  checkInId: string
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn
}
@injectable()
export class ValidateCheckInService {
  constructor(
    @inject('CheckInsRepository')
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
