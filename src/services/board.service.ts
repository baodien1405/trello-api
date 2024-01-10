import { BadRequestError, NotFoundError } from '@/core'
import { BoardModel, CardModel, ColumnModel } from '@/models'
import { Board, MoveCardDiffColumnPayload } from '@/types'
import { ObjectId } from 'mongodb'
import slugify from 'slugify'
import cloneDeep from 'lodash/cloneDeep'

const createBoard = async (payload: Board) => {
  const newBoard = {
    ...payload,
    slug: slugify(payload.title, { lower: true })
  }

  const createdBoard = await BoardModel.createBoard(newBoard)
  const board = await BoardModel.findOneById(createdBoard.insertedId)

  return board
}

const getBoardDetails = async (boardId: ObjectId) => {
  const board = await BoardModel.getBoardDetails(boardId)

  if (!board) throw new NotFoundError('Board not found!')

  const newBoard = cloneDeep(board)

  newBoard.columns.forEach((column: any) => {
    column.cards = newBoard.cards.filter((card: any) => card.columnId.equals(column._id))
  })

  delete newBoard.cards

  return newBoard
}

const updateBoard = async (boardId: ObjectId, payload: Partial<Board>) => {
  const updateData = {
    ...payload,
    updatedAt: Date.now()
  }

  const updatedBoard = await BoardModel.updateBoard(boardId, updateData)

  if (!updatedBoard) throw new BadRequestError('Failed to update board!')

  return updatedBoard
}

const moveCardToDifferentColumn = async (payload: MoveCardDiffColumnPayload) => {
  await ColumnModel.updateColumn(payload.prevColumnId, {
    cardOrderIds: payload.prevCardOrderIds,
    updatedAt: Date.now()
  })

  await ColumnModel.updateColumn(payload.nextColumnId, {
    cardOrderIds: payload.nextCardOrderIds,
    updatedAt: Date.now()
  })

  await CardModel.updateCard(payload.currentCardId, {
    columnId: payload.nextColumnId,
    updatedAt: Date.now()
  })

  return { updateResult: 'Successfully' }
}

export const BoardService = {
  createBoard,
  getBoardDetails,
  updateBoard,
  moveCardToDifferentColumn
}
