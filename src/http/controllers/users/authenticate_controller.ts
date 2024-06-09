import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticateService } from '@/services/authenticate_service'
import { UserAlreadyExistsError } from '@/services/errors/user_already_exists_error'
import { injectable, inject } from 'tsyringe'

@injectable()
export class AuthenticateController {
  constructor(
    @inject('AuthenticateService')
    private AuthenticateService: AuthenticateService,
  ) {}

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .strict()

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const { user } = await this.AuthenticateService.execute({
        email,
        password,
      })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        },
      )

      return reply.status(200).send({
        token,
      })
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(400).send({ message: error.message })
      }
      throw error
    }
  }
}
