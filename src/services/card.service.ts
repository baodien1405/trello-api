import cloneDeep from 'lodash/cloneDeep'
import { ObjectId } from 'mongodb'
import { BadRequestError, NotFoundError } from '@/core'
import { CardModel, ColumnModel } from '@/models'
import { Card } from '@/types'

const createCard = async (payload: Card) => {
  const createdCard = await CardModel.createCard(payload)
  const card = await CardModel.findOneById(createdCard.insertedId)

  if (card) {
    await ColumnModel.pushCardOrderIds(card)
  }

  return card
}

const getCardDetails = async (cardId: ObjectId) => {
  const card = await CardModel.findOneById(cardId)

  if (!card) throw new NotFoundError('Card not found!')

  const newCard = cloneDeep(card)

  return newCard
}

const updateCard = async (cardId: ObjectId, payload: Partial<Card>) => {
  const updateData = {
    ...payload,
    updatedAt: Date.now()
  }

  const updatedCard = await CardModel.updateCard(cardId, updateData)

  if (!updatedCard) throw new BadRequestError('Failed to update card!')

  return updatedCard
}

export const CardService = {
  createCard,
  getCardDetails,
  updateCard
}
