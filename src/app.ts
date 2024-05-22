import 'reflect-metadata'
import './shared/container'
import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()
console.log(env.NODE_ENV === 'dev' ? env.NODE_ENV : null)
app.register(appRoutes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
