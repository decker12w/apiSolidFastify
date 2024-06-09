import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const reponse = await request(app.server).post('/users').send({
      email: 'john@examplezxz.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(reponse.statusCode).toEqual(201)
  })
})
