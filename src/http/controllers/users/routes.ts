import { FastifyInstance } from 'fastify'

import { profile } from './profile_controller'
import { verifyJWT } from '../../middlewares/verify_jwt'
import { authenticateController, registerController } from '@/shared/container'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController.register.bind(registerController))
  app.post(
    '/authenticate',
    authenticateController.authenticate.bind(authenticateController),
  )
  app.get('/profile', { onRequest: [verifyJWT] }, profile)
}
