import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import exitHook from 'async-exit-hook'

import App from '@/app'
import { ErrorResponse } from '@/core'
import { closeDB, connectDB } from '@/database'
import { env } from '@/config'

const DELAY = 0

const StartServer = async () => {
  const app = express()

  app.use(function (req, res, next) {
    setTimeout(next, DELAY)
  })

  app.use(morgan('dev'))
  app.use(helmet())
  app.use(compression())
  app.use(cookieParser())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  await App(app)

  // Handling error
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorResponse('Not Found', 'Not Found', 404)
    next(error)
  })

  app.use((error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.code || 500
    return res.status(statusCode).json({
      status: error.status,
      code: statusCode,
      stack: error.stack,
      message: error.message || 'Internal Server Error'
    })
  })

  app.listen(env.PORT, () => {
    console.log(`3. Listening to the port ${env.PORT}`)
  })

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
