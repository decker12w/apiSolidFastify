import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateGymService } from '@/services/create_gym_service'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateGymController {
  constructor(
    @inject('CreateGymService') private createGymService: CreateGymService,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const createGymBodySchema = z
      .object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine((value) => Math.abs(value) <= 90),
        longitude: z.number().refine((value) => Math.abs(value) <= 180),
      })
      .strict()

    const { title, description, phone, latitude, longitude } =
      createGymBodySchema.parse(request.body)

    const gym = await this.createGymService.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    reply.status(201).send(gym)
  }
}
