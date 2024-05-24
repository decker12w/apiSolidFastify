import { UsersRepository } from '@/repositories/user_repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid_credentials_error'
import { compare } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateReponse {
  user: User
}

@injectable()
export class AuthenticateService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateReponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    //Boolean is , has, does
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
