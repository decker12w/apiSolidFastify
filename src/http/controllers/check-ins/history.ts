import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { inject, injectable } from 'tsyringe'
import { FetchUserCheckInsHistoryService } from '@/services/fetch_users_check-ins_history'

@injectable()
export class HistoryController {
  constructor(
    @inject('FetchUserCheckInsHistoryService')
    private fetchUserCheckInsHistoryService: FetchUserCheckInsHistoryService,
  ) {}

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const searchGymBodySchema = z
      .object({
        page: z.coerce.number().min(1).default(1),
      })
      .strict()

    const { page } = searchGymBodySchema.parse(request.body)

    const { checkIns } = await this.fetchUserCheckInsHistoryService.execute({
      userId: request.user.sub,
      page,
    })

    reply.status(200).send({
      checkIns,
    })
  }
}
