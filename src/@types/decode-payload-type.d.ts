import { DecodePayloadType } from '@fastify/jwt'

export interface IDecodePayloadType extends DecodePayloadType {
  sub: string
}
