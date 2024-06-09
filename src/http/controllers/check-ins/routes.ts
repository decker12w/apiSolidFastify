import { verifyJWT } from '@/http/middlewares/verify_jwt'
import { FastifyInstance } from 'fastify'
import { CreateCheckInController } from './create'
import { container } from 'tsyringe'
import { HistoryController } from './history'
import { MetrictsController } from './metrics'
import { ValidateCheckInController } from './validate'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  const historyController = container.resolve(HistoryController)
  const metrictsController = container.resolve(MetrictsController)
  const validateCheckInController = container.resolve(ValidateCheckInController)
  const createCheckInController = container.resolve(CreateCheckInController)

  app.get(
    '/check-ins/history',
    historyController.execute.bind(historyController),
  )
  app.get(
    '/check-ins/metrics',
    metrictsController.execute.bind(metrictsController),
  )
  app.post(
    '/gyms/:gymId/check-ins',
    validateCheckInController.validate.bind(validateCheckInController),
  )
  app.patch(
    '/check-ins/:checkInId/validate',
    createCheckInController.create.bind(createCheckInController),
  )
}
