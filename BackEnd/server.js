require('dotenv').config()

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('JWT_SECRET must be set in production')
  process.exit(1)
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoute = require('./routes/auth')

const app = express()
const port = Number(process.env.PORT) || 5000
const RETRY_DELAY_MS = 5000

app.use(cors())
app.use(express.json())

// Reports unhealthy until MongoDB is reachable, so Docker and proxies can rely on it.
app.get('/api/health', (request, response) => {
  const databaseConnected = mongoose.connection.readyState === 1
  response
    .status(databaseConnected ? 200 : 503)
    .json({ status: databaseConnected ? 'ok' : 'unavailable', database: databaseConnected })
})

app.use('/api/auth', authRoute)

app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' })
})

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/food-delivery'

// mongoose does not retry a failed first connection on its own.
const connectToDatabase = () => {
  mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
      console.error(`MongoDB connection error: ${error.message}. Retrying in ${RETRY_DELAY_MS / 1000}s`)
      setTimeout(connectToDatabase, RETRY_DELAY_MS)
    })
}

connectToDatabase()

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`)
})

const shutdown = (signal) => {
  console.log(`${signal} received, shutting down`)
  server.close(() => {
    mongoose.disconnect().finally(() => process.exit(0))
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
