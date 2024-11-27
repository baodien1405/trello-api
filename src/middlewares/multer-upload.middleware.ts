import multer from 'multer'
import { Request } from 'express'

import { ALLOW_COMMON_FILE_TYPES, LIMIT_COMMON_FILE_SIZE } from '@/constants'
import { UnprocessableEntityRequestError } from '@/core'

const customFileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    const errorMessage = 'File type is invalid. Only accept jpg, jpeg and png'
    return callback(new UnprocessableEntityRequestError(errorMessage))
  }

  return callback(null, true)
}

const upload = multer({
  limits: { fieldSize: LIMIT_COMMON_FILE_SIZE },
  fileFilter: customFileFilter
})

export const multerUploadMiddleware = {
  upload
}
