import 'reflect-metadata'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate-user'

describe('Create gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const token = await createAndAuthenticate(app)

    const reponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript gyms',
        description: 'The best gym in the world',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(reponse.statusCode).toEqual(201)
  })
})
