import Fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  }
})

// Endpoint de verificación de estado (Health Check)
app.get('/health', async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'OrderFlow B2B API',
    version: '1.0.0'
  }
})

// Endpoint básico de bienvenida / test
app.get('/api', async () => {
  return {
    message: 'Bienvenido a OrderFlow API - Sistema de Seguimiento de Pedidos y Logística'
  }
})

const PORT = Number(process.env.PORT) || 3000

async function bootstrap() {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`🚀 Servidor OrderFlow corriendo en http://localhost:${PORT}`)
    console.log(`📋 Health check disponible en http://localhost:${PORT}/health`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()
