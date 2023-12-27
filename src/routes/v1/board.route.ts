import express, { Request, Response } from 'express'

import { asyncHandler } from '@/helpers'

const router = express.Router()

router.get(
  '/',
  asyncHandler((req: Request, res: Response) => {
    res.status(200).json({ message: 'Get board!' })
  })
)

router.post(
  '/',
  asyncHandler(
    asyncHandler((req: Request, res: Response) => {
      res.status(201).json({ message: 'Create board!' })
    })
  )
)

export const BoardRoute = router
