import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, injectable } from 'tsyringe'
import { GetUserMetricsService } from '@/services/get-user_metrics'

@injectable()
export class MetrictsController {
  constructor(
    @inject('GetUserMetricsService')
    private getUserMetricsService: GetUserMetricsService,
  ) {}

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const { checkInsCount } = await this.getUserMetricsService.execute({
      userId: request.user.sub,
    })

    reply.status(200).send({
      checkInsCount,
    })
  }
}
