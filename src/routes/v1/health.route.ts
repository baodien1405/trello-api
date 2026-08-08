import express from 'express'
import { HealthController } from '@/controllers'
import { asyncHandler } from '@/helpers'

const router = express.Router()

router.get('/', asyncHandler(HealthController.check))

export const HealthRoute = router
