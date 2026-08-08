import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SuccessResponse } from '@/core'
import { getDB } from '@/database'
import { env } from '@/config'

const check = async (req: Request, res: Response, next: NextFunction) => {
  let dbStatus = 'disconnected'
  let dbLatencyMs: number | null = null

  try {
    const startTime = Date.now()
    const db = getDB()
    await db.command({ ping: 1 })
    dbLatencyMs = Date.now() - startTime
    dbStatus = 'connected'
  } catch (error) {
    dbStatus = 'disconnected'
  }

  const isHealthy = dbStatus === 'connected'

  const metadata = {
    status: isHealthy ? 'OK' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    db: {
      status: dbStatus,
      latencyMs: dbLatencyMs
    }
  }

  if (!isHealthy) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      message: 'Service Degraded',
      status: 'SERVICE_UNAVAILABLE',
      code: StatusCodes.SERVICE_UNAVAILABLE,
      metadata
    })
  }

  new SuccessResponse({
    message: 'API health check successful',
    metadata
  }).send(res)
}

export const HealthController = {
  check
}
