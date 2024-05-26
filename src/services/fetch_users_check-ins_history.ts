import { CheckIn } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { CheckInsRepository } from '@/repositories/check-ins_repository'

interface FetchUserCheckInsHistoryServiceRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[]
}
@injectable()
export class FetchUserCheckInsHistoryService {
  constructor(
    @inject('CheckInsRepository')
    private checkInRepository: CheckInsRepository,
  ) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
