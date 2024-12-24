import { createNewBoardInvitationSchema } from '@/validations/invitation/create-new-board-invitation.schema'
import { updateBoardInvitationSchema } from '@/validations/invitation/update-board-invitation.schema'

export const invitationSchema = {
  createNewBoardInvitation: createNewBoardInvitationSchema,
  updateBoardInvitation: updateBoardInvitationSchema
}
