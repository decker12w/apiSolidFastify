import { UsersRepository } from '@/repositories/user_repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './erros/invalid_credentials_error'
import { compare } from 'bcryptjs'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateReponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

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
