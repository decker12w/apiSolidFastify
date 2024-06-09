import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify_jwt'
import {
  createGymController,
  searchGymController,
  nearbyController,
} from '@/shared/containerGym'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGymController.search.bind(searchGymController))
  app.get('/gyms/nearby', nearbyController.execute.bind(nearbyController))
  app.post('/gyms', createGymController.create.bind(createGymController))
}
