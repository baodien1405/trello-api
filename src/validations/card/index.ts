import { createCardSchema } from '@/validations/card/create-card.schema'
import { getCardDetailsSchema } from '@/validations/card/get-card-details.schema'
import { updateCardSchema } from '@/validations/card/update-card.schema'

export const cardSchema = {
  createCard: createCardSchema,
  getCardDetails: getCardDetailsSchema,
  updateCard: updateCardSchema
}
