import { app } from '@/app'
import supertest from 'supertest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Testes unitários relacionado às rotas de post', () => {
  const GENERIC_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJmYWJpbiIsImlhdCI6MTcyMjkxMTY3MiwiZXhwIjoxNzIyOTQ3NjcyfQ.66w8js0bK__GtFjGt12Dbsqoj-N14GTPheDZfb_HvnA'

  test('verifica a criação de um post', async () => {
    const post = {
      title: 'post teste',
      content: 'conteudo generico de teste',
    }

    const response = await supertest(app.server)
      .post('/post')
      .send(post)
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(201)
  })

  test('verifica a atualização de um post', async () => {
    const post = {
      title: 'atualização de post teste',
      content: 'conteudo generico atualizado de post de teste',
    }

    const response = await supertest(app.server)
      .post('/post')
      .send(post)
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(201)
  })

  test('verifica a deleção de um post', async () => {
    const response = await supertest(app.server)
      .delete('/post/1')
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(204)
  })

  test('verifica a busca de todos os posts', async () => {
    const response = await supertest(app.server)
      .get('/post/all')
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(200)
  })

  test('verifica a busca por id', async () => {
    const response = await supertest(app.server)
      .get('/post/1')
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(200)
  })

  test('verifica a busca por palavra chave', async () => {
    const response = await supertest(app.server)
      .get('/post/wordkey/test')
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(200)
  })

  test('verifica a busca de one page', async () => {
    const response = await supertest(app.server)
      .get('/post/onepage')
      .query({ page: 1, limit: 2 })
      .set('Authorization', `Bearer ${GENERIC_TOKEN}`)

    expect(response.statusCode).toBe(200)
  })
})
