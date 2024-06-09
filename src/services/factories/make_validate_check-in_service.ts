import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins_repository'
import { ValidateCheckInService } from '../validate_check-in_service'

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validateCheckInService = new ValidateCheckInService(checkInsRepository)
  return validateCheckInService
}
