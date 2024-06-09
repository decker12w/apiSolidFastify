import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins_repository'
import { FetchUserCheckInsHistoryService } from '../fetch_users_check-ins_history'

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchNearbyGymsService = new FetchUserCheckInsHistoryService(
    checkInsRepository,
  )
  return fetchNearbyGymsService
}
