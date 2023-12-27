import express, { Request, Response } from 'express'

import { asyncHandler } from '@/helpers'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get cards!' })
})

router.post(
  '/',
  asyncHandler(
    asyncHandler((req: Request, res: Response) => {
      res.status(201).json({ message: 'Create card!' })
    })
  )
)

export const CardRoute = router
