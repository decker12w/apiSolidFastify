import { CheckInsRepository } from '@/repositories/check-ins_repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in_memory_check-ins_repository'
import { CheckInService } from '@/services/check-in_service'
import { FetchUserCheckInsHistoryService } from '@/services/fetch_users_check-ins_history'
import { ValidateCheckInService } from '@/services/validate_check-in_service'
import { container } from 'tsyringe'

container.register<CheckInService>('CheckInService', {
  useClass: CheckInService,
})

container.register<FetchUserCheckInsHistoryService>(
  'FetchUserCheckInsHistoryService',
  {
    useClass: FetchUserCheckInsHistoryService,
  },
)
container.register<ValidateCheckInService>('ValidateCheckInService ', {
  useClass: ValidateCheckInService,
})

container.register<CheckInsRepository>('CheckInsRepository', {
  useClass: InMemoryCheckInsRepository,
})
