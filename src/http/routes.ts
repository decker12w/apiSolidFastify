import { FastifyInstance } from 'fastify'
import { RegisterController } from './controllers/register_controller'
import { container } from 'tsyringe'
import { AuthenticateController } from './controllers/authenticate_controller'

export async function appRoutes(app: FastifyInstance) {
  const registerController = container.resolve(RegisterController)
  const authenticateController = container.resolve(AuthenticateController)

  app.post('/users', registerController.register.bind(registerController))
  app.post(
    '/authenticate',
    authenticateController.authenticate.bind(authenticateController),
  )
}
