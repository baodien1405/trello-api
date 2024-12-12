import cloneDeep from 'lodash/cloneDeep'
import { ObjectId } from 'mongodb'

import { BadRequestError, NotFoundError } from '@/core'
import { CardModel, ColumnModel } from '@/models'
import { AuthPayload, Card, Comment } from '@/types'
import { CloudinaryProvider } from '@/config'

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

const updateCard = async (
  cardId: ObjectId,
  payload: Partial<Card & { commentToAdd: Pick<Comment, 'userAvatar' | 'content' | 'userDisplayName'> }>,
  user: AuthPayload,
  cardCoverFile?: Express.Multer.File
) => {
  const updateData: Partial<Card> = {
    updatedAt: Date.now()
  }

  if (cardCoverFile) {
    const uploadResult: any = await CloudinaryProvider.streamUpload(cardCoverFile.buffer, 'card-covers')
    updateData.cover = uploadResult.secure_url
  } else if (payload.commentToAdd) {
    const commentData = {
      ...payload.commentToAdd,
      commentedAt: Date.now(),
      userId: user._id,
      userEmail: user.email
    }
    const updatedCardComment = await CardModel.unshiftNewComment({
      cardId,
      commentData,
      updatedAt: Date.now()
    })

    if (!updatedCardComment) throw new BadRequestError('Failed to update card comment!')

    return updatedCardComment
  } else {
    Object.assign(updateData, payload)
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
