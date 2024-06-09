import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { inject, injectable } from 'tsyringe'
import { SearchGymsService } from '@/services/search_gym_service'

@injectable()
export class SearchGymController {
  constructor(
    @inject('SearchGymsService') private searchGymService: SearchGymsService,
  ) {}

  async search(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
      q: z.string(),
      page: z.coerce.number().min(1).default(1),
    })

    const { q, page } = searchGymsQuerySchema.parse(request.query)

    const { gyms } = await this.searchGymService.execute({
      query: q,
      page,
    })

    return reply.status(200).send({
      gyms,
    })
  }
}
