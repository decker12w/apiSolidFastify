import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { RegisterService } from '../register_service'

export function makeRegisterService() {
  const UsersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(UsersRepository)
  return registerService
}
