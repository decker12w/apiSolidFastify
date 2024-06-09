import { AuthenticateController } from '@/http/controllers/users/authenticate_controller'
import { RegisterController } from '@/http/controllers/users/register_controller'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { UsersRepository } from '@/repositories/user_repository'
import { AuthenticateService } from '@/services/authenticate_service'
import { GetUserMetricsService } from '@/services/get-user_metrics'
import { RegisterService } from '@/services/register_service'
import { container } from 'tsyringe'

container.register<UsersRepository>('UsersRepository', {
  useClass: PrismaUsersRepository,
})

container.register<RegisterService>('RegisterService', {
  useClass: RegisterService,
})

container.register<AuthenticateService>('AuthenticateService', {
  useClass: AuthenticateService,
})

container.register<GetUserMetricsService>('GetUserMetricsService ', {
  useClass: GetUserMetricsService,
})

const registerController = container.resolve(RegisterController)
const authenticateController = container.resolve(AuthenticateController)

export { registerController, authenticateController }
