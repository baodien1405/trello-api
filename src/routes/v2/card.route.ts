import express, { Request, Response } from 'express'

import { asyncHandler } from '@/helpers'

const router = express.Router()

router.get(
  '/',
  asyncHandler((req: Request, res: Response) => {
    res.status(200).json('Get card!')
  })
)

router.post(
  '/',
  asyncHandler((req: Request, res: Response) => {
    res.status(201).json({ message: 'Create card!' })
  })
)

export const CardRoute = router
