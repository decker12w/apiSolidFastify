import { inject, injectable } from 'tsyringe'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms_repository'

interface SearchGymsServiceRequest {
  query: string
  page: number
}

interface SearchGymsServiceResponse {
  gyms: Gym[]
}
@injectable()
export class SearchGymsService {
  constructor(
    @inject('GymsRepository')
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    query,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
