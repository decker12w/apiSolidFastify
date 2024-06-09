import { PrismaGymsRepository } from '@/repositories/prisma/prisma_gyms_repository'
import { FetchNearbyGymsService } from '../fetch_nearby_gyms_service'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository)
  return fetchNearbyGymsService
}
