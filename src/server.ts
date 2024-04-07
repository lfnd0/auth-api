import { app } from './app'
import { env } from './env'

const { PORT } = env

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.info(`🚀️ HTTP server running at: http://localhost:${PORT}`)
  })
