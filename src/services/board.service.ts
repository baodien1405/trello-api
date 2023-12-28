import { Board } from '@/types'
import slugify from 'slugify'

const createBoard = async (payload: Board) => {
  const { title, description } = payload

  const newBoard = {
    title,
    description,
    slug: slugify(title, { lower: true })
  }

  return newBoard
}

export const BoardService = {
  createBoard
}
