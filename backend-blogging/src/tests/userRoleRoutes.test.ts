import { app } from '@/app'
import supertest from 'supertest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Testes unitários relacionado à rota de userRole', () => {
  const GENERIC_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJmYWJpbiIsImlhdCI6MTcyMjkxMTY3MiwiZXhwIjoxNzIyOTQ3NjcyfQ.66w8js0bK__GtFjGt12Dbsqoj-N14GTPheDZfb_HvnA'

  test('verifica a atribuição de um usuário e uma role', async () => {
    const userRole = {
      user_id: 1,
      role_id: 1,
    }
    const response = await supertest(app.server)
      .post('/userrole')
      .send(userRole)
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(201)
  })
})
