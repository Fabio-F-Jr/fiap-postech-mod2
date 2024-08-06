import { app } from '@/app'
import supertest from 'supertest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Testes unitários relacionado às rotas de user', () => {
  const GENERIC_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJmYWJpbiIsImlhdCI6MTcyMjkxMTY3MiwiZXhwIjoxNzIyOTQ3NjcyfQ.66w8js0bK__GtFjGt12Dbsqoj-N14GTPheDZfb_HvnA'

  test('verifica a criação de um usuário', async () => {
    const usuario = {
      username: 'usuarioTeste',
      name: 'UserTest',
      cpf: '12345678912',
      password: '123',
    }
    const response = await supertest(app.server)
      .post('/user')
      .send(usuario)
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(201)
  })

  // test('verifica a geração de token JWT', async () => {
  //   const usuario = {
  //     username: 'admin',
  //     password: 'admin',
  //   }
  //   const response = await supertest(app.server)
  //     .post('/user/signin')
  //     .send(usuario)

  //   expect(response.statusCode).toBe(200)
  // })
})
