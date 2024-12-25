import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import exitHook from 'async-exit-hook'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import App from '@/app'
import { ErrorResponse } from '@/core'
import { closeDB, connectDB } from '@/database'
import { corsOptions, env } from '@/config'
import { errorHandlingMiddleware } from './middlewares'
import { inviteUserToBoardSocket } from '@/sockets'

const DELAY = 0

const StartServer = async () => {
  const app = express()

  app.use(function (req, res, next) {
    setTimeout(next, DELAY)
  })

  app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-store')
    next()
  })

  app.use(morgan('dev'))
  app.use(helmet())
  app.use(compression())
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const server = createServer(app)
  const io = new Server(server, { cors: corsOptions })

  io.on('connection', (socket) => {
    inviteUserToBoardSocket(socket)
  })

  await App(app)

  // Handling error
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorResponse('Not Found', 'Not Found', 404)
    next(error)
  })

  app.use(errorHandlingMiddleware)

  if (env.NODE_ENV === 'production') {
    server.listen(process.env.PORT, () => {
      console.log(`3. Production: Listening to the port ${process.env.PORT}`)
    })
  } else {
    server.listen(env.PORT, () => {
      console.log(`3. Local: Listening to the port ${env.PORT}`)
    })
  }

  exitHook(() => {
    console.log('4. Disconnecting to MongoDB Cloud Atlas...')
    closeDB()
    console.log('5. Disconnected to MongoDB Cloud Atlas...')
  })
}

// Connect DB
;(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await connectDB()
    console.log('2. Connected to MongoDB Cloud Atlas...')
    await StartServer()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
