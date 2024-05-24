import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { AuthenticateService } from '../authenticate_service'

export function makeRegisterService() {
  const UsersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(UsersRepository)
  return authenticateService
}
