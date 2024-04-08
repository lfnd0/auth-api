import { FastifyReply } from 'fastify'

export function loggerInfo(reply: FastifyReply, description: string) {
  return reply.log.info(description)
}

export function loggerError(
  reply: FastifyReply,
  description: string,
  stack?: string,
) {
  return reply.log.error({ stack }, description)
}
