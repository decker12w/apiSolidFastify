import { PrismaGymsRepository } from '@/repositories/prisma/prisma_gyms_repository'
import { CreateGymService } from '../create_gym_service'

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const createGymService = new CreateGymService(gymsRepository)
  return createGymService
}
