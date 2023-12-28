import { BoardModel } from '@/models'
import { Board } from '@/types'
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

export const BoardService = {
  createBoard
}
