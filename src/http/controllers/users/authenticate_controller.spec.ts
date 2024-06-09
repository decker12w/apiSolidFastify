import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@exampled.com',
      password: '123456',
    })

    const reponse = await request(app.server).post('/authenticate').send({
      email: 'john@exampled.com',
      password: '123456',
    })

    expect(reponse.statusCode).toEqual(200)
    expect(reponse.body).toEqual({ token: expect.any(String) })
  })
})
