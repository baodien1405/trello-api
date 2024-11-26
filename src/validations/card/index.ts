import { createCardSchema } from '@/validations/card/create-card.schema'
import { getCardDetailsSchema } from '@/validations/card/get-card-details.schema'

export const cardSchema = {
  createCard: createCardSchema,
  getCardDetails: getCardDetailsSchema
}
