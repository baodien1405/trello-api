import { BadRequestError, NotFoundError } from '@/core'
import { BoardModel } from '@/models'
import { Board } from '@/types'
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
    column.cards = newBoard.cards.filter((card: any) => card.columnId.toString() === column._id.toString())
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

export const BoardService = {
  createBoard,
  getBoardDetails,
  updateBoard
}
