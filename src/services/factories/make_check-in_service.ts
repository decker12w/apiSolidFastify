import { PrismaGymsRepository } from '@/repositories/prisma/prisma_gyms_repository'
import { CheckInService } from '../check-in_service'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins_repository'

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInService = new CheckInService(checkInsRepository, gymsRepository)
  return checkInService
}
