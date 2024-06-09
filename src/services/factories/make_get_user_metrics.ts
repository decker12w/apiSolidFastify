import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins_repository'
import { GetUserMetricsService } from '../get-user_metrics'

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchNearbyGymsService = new GetUserMetricsService(checkInsRepository)
  return fetchNearbyGymsService
}
