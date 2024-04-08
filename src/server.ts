import { app } from './app'
import { env } from './env'

const { PORT } = env

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.info(`🚀️ HTTP server running at: http://localhost:${PORT}`)
  })
