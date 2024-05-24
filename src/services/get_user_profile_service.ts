import { UsersRepository } from '@/repositories/user_repository'
import { User } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { ResourceNotFoundError } from './errors/resource_not_found_error'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileReponse {
  user: User
}

@injectable()
export class GetUserProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileReponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
