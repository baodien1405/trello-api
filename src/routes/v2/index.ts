import express from 'express'

import { CardRoute } from './card.route'

const router = express.Router()

router.use('/cards', CardRoute)

export const API_ROUTE_V2 = router
