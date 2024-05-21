import { FastifyInstance } from 'fastify'
import { RegisterController } from './controllers/register_controller'
import { AuthenticateController } from './controllers/authenticate_controller'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { RegisterService } from '@/services/register_service'
import { AuthenticateService } from '@/services/authenticate'

export async function appRoutes(app: FastifyInstance) {
  const user_repository = new PrismaUsersRepository()
  const register_service = new RegisterService(user_repository)
  /*   const authenticate_service = new AuthenticateService(user_repository) */
  const registerController = new RegisterController(register_service)
  /*   const authenticateController = new AuthenticateController(
    authenticate_service,
  ) */

  app.post('/users', registerController.register.bind(registerController))
  /*   app.post('/authenticate', authenticateController.authenticate) */
}
