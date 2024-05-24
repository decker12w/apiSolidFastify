import { UsersRepository } from '@/repositories/user_repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user_already_exists_error'
import { User } from '@prisma/client'
import { injectable, inject } from 'tsyringe'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceReponse {
  user: User
}

@injectable()
export class RegisterService {
  constructor(
    @inject('UsersRepository') private userRepository: UsersRepository,
  ) {}

  async create({
    name,
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceReponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
