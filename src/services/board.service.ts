import { NotFoundError } from '@/core'
import { BoardModel } from '@/models'
import { Board } from '@/types'
import { ObjectId } from 'mongodb'
import slugify from 'slugify'

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

  return board
}

export const BoardService = {
  createBoard,
  getBoardDetails
}
