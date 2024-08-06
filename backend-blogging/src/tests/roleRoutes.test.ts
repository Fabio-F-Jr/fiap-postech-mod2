import { app } from '@/app'
import supertest from 'supertest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Testes unitários relacionado à rota de role', () => {
  const GENERIC_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJmYWJpbiIsImlhdCI6MTcyMjkxMTY3MiwiZXhwIjoxNzIyOTQ3NjcyfQ.66w8js0bK__GtFjGt12Dbsqoj-N14GTPheDZfb_HvnA'

  test('verifica a criação de uma role', async () => {
    const role = {
      name: 'RoleTest',
    }
    const response = await supertest(app.server)
      .post('/role')
      .send(role)
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(201)
  })
})
