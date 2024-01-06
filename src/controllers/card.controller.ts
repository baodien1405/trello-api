import { Request, Response, NextFunction } from 'express'
import { CREATED, OK } from '@/core'
import { BoardService, CardService } from '@/services'
import { ObjectId } from 'mongodb'

const createCard = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Created successfully!',
    metadata: await CardService.createCard(req.body)
  }).send(res)
}

const getCardDetails = async (req: Request, res: Response, next: NextFunction) => {
  const cardId = new ObjectId(req.params.id)

  new OK({
    message: 'Get card successfully!',
    metadata: await CardService.getCardDetails(cardId)
  }).send(res)
}

export const CardController = {
  createCard,
  getCardDetails
}
