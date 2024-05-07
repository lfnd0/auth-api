import { FastifyReply, FastifyRequest } from 'fastify'

export async function root(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({
    message: 'Welcome to Auth API',
  })
}
