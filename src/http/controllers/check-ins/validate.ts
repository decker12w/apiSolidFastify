import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { inject, injectable } from 'tsyringe'
import { ValidateCheckInService } from '@/services/validate_check-in_service'

@injectable()
export class ValidateCheckInController {
  constructor(
    @inject('ValidateCheckInService')
    private validateCheckInService: ValidateCheckInService,
  ) {}

  async validate(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsShcema = z.object({
      checkInId: z.string().uuid(),
    })

    const { checkInId } = validateCheckInParamsShcema.parse(request.params)

    await this.validateCheckInService.execute({
      checkInId,
    })

    reply.status(201).send()
  }
}
