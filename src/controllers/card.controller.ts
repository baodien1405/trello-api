import { Request, Response, NextFunction } from 'express'
import { CREATED, OK } from '@/core'
import { CardService } from '@/services'
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

const updateCard = async (req: Request, res: Response, next: NextFunction) => {
  const cardId = new ObjectId(req.params.id)

  new OK({
    message: 'Update card success!',
    metadata: await CardService.updateCard(cardId, req.body, req.file)
  }).send(res)
}

export const CardController = {
  createCard,
  getCardDetails,
  updateCard
}
