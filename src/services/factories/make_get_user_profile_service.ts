import { GetUserProfileService } from '../get_user_profile_service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileService = new GetUserProfileService(usersRepository)
  return getUserProfileService
}
