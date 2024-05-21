import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterService } from '@/services/register_service'
import { UserAlreadyExistsError } from '@/services/erros/user_already_exists_error'

export class RegisterController {
  constructor(private RegisterService: RegisterService) {}

  async register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .strict()

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
      await this.RegisterService.create({
        name,
        email,
        password,
      })
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(406).send({ message: error.message })
      }
      throw error
    }

    reply.status(201).send()
  }
}
