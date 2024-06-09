import 'reflect-metadata' // Import this at the top
import './shared/container' // Ensure this is imported early
import './shared/containerGym' // Ensure this is imported early
import fastify from 'fastify'
import { appRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()
console.log(env.NODE_ENV ? env.NODE_ENV : null)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
