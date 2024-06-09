import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { inject, injectable } from 'tsyringe'
import { FetchNearbyGymsService } from '@/services/fetch_nearby_gyms_service'

@injectable()
export class NearbyGymController {
  constructor(
    @inject('FetchNearbyGymsService')
    private fetchGymService: FetchNearbyGymsService,
  ) {}

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
      latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const { gyms } = await this.fetchGymService.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(200).send({
      gyms,
    })
  }
}
