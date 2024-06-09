import { SearchGymsService } from '../search_gym_service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma_gyms_repository'

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const gymsService = new SearchGymsService(gymsRepository)
  return gymsService
}
