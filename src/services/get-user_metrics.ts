import { inject, injectable } from 'tsyringe'
import { CheckInsRepository } from '@/repositories/check-ins_repository'

interface GetUserMetricServiceRequest {
  userId: string
}

interface GetUserMetricServiceResponse {
  checkInsCount: number
}
@injectable()
export class GetUserMetricsService {
  constructor(
    @inject('CheckInsRepository')
    private checkInRepository: CheckInsRepository,
  ) {}

  async execute({
    userId,
  }: GetUserMetricServiceRequest): Promise<GetUserMetricServiceResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
