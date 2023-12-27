import express from 'express'
import { BoardRoute } from './board.route'
import { CardRoute } from './card.route'

const router = express.Router()

router.use('/boards', BoardRoute)
router.use('/cards', CardRoute)

export const APIs_ROUTE_V1 = router
