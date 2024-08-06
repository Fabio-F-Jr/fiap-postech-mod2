/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeCreatePostUseCase } from '@/use-cases/factory/make-create-post-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string(),
  })

  const { title, content } = registerBodySchema.parse(request.body)

  const createPostUseCase = makeCreatePostUseCase()

  const author = await request.jwtDecode().then((tokenPayload) => {
    const { id }: any = tokenPayload
    return id
  })

  const post = await createPostUseCase.handler(
    {
      title,
      content,
      creation_date: new Date(),
      update_date: new Date(),
    },
    author,
  )

  return reply.status(201).send(post)
}
