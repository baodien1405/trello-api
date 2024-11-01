import express from 'express'

import { BoardRoute } from '@/routes/v1/board.route'
import { ColumnRoute } from '@/routes/v1/column.route'
import { CardRoute } from '@/routes/v1/card.route'
import { AuthRoute } from '@/routes/v1/auth.route'

const router = express.Router()

router.use('/boards', BoardRoute)
router.use('/columns', ColumnRoute)
router.use('/cards', CardRoute)
router.use('/', AuthRoute)

export const API_ROUTE_V1 = router
