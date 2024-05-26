import { inject, injectable } from 'tsyringe'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms_repository'

interface searchGymsServiceRequest {
  query: string
  page: number
}

interface searchGymsServiceResponse {
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
  }: searchGymsServiceRequest): Promise<searchGymsServiceResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
