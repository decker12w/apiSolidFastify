import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { inject, injectable } from 'tsyringe'
import { CheckInService } from '@/services/check-in_service'

@injectable()
export class CreateCheckInController {
  constructor(
    @inject('CheckInService') private checkInService: CheckInService,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsShcema = z.object({
      gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z
      .object({
        latitude: z.number().refine((value) => {
          return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
          return Math.abs(value) <= 180
        }),
      })
      .strict()

    const { gymId } = createCheckInParamsShcema.parse(request.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

    await this.checkInService.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    reply.status(201).send()
  }
}
