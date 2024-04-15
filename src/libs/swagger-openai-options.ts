import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'

export const swaggerOpenAPIOptions: FastifyDynamicSwaggerOptions = {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      description: 'A simple API for authentication of users.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        authorization: {
          type: 'http',
          description: 'JSON Web Tokens',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
}
