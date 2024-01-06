import cloneDeep from 'lodash/cloneDeep'
import { ObjectId } from 'mongodb'
import { NotFoundError } from '@/core'
import { CardModel } from '@/models'
import { Card } from '@/types'

const createCard = async (payload: Card) => {
  const createdCard = await CardModel.createCard(payload)
  const card = await CardModel.findOneById(createdCard.insertedId)

  return card
}

const getCardDetails = async (cardId: ObjectId) => {
  const card = await CardModel.findOneById(cardId)

  if (!card) throw new NotFoundError('Card not found!')

  const newCard = cloneDeep(card)

  return newCard
}

export const CardService = {
  createCard,
  getCardDetails
}
