import { container } from 'tsyringe'
import { CreateGymController } from '@/http/controllers/gyms/create'
import { NearbyGymController } from '@/http/controllers/gyms/nearby'
import { SearchGymController } from '@/http/controllers/gyms/search'
import { GymsRepository } from '@/repositories/gyms_repository'
import { CreateGymService } from '@/services/create_gym_service'
import { FetchNearbyGymsService } from '@/services/fetch_nearby_gyms_service'
import { SearchGymsService } from '@/services/search_gym_service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma_gyms_repository'

// Register services
container.register<GymsRepository>('GymsRepository', {
  useClass: PrismaGymsRepository,
})
container.register<CreateGymService>('CreateGymService', {
  useClass: CreateGymService,
})
container.register<SearchGymsService>('SearchGymsService', {
  useClass: SearchGymsService,
})
container.register<FetchNearbyGymsService>('FetchNearbyGymsService', {
  useClass: FetchNearbyGymsService,
})

// Resolve controllers
const createGymController = container.resolve(CreateGymController)
const searchGymController = container.resolve(SearchGymController)
const nearbyController = container.resolve(NearbyGymController)

export { createGymController, searchGymController, nearbyController }
