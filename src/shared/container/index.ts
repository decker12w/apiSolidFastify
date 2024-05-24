import { CheckInsRepository } from '@/repositories/check-ins_repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in_memory_check-ins_repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { UsersRepository } from '@/repositories/user_repository'
import { AuthenticateService } from '@/services/authenticate_service'
import { RegisterService } from '@/services/register_service'
import { container } from 'tsyringe'

container.register<CheckInsRepository>('CheckInsRepository', {
  useClass: InMemoryCheckInsRepository,
})

container.register<UsersRepository>('UsersRepository', {
  useClass: PrismaUsersRepository,
})

container.register<RegisterService>('RegisterService', {
  useClass: RegisterService,
})

container.register<AuthenticateService>('AuthenticateService', {
  useClass: AuthenticateService,
})
