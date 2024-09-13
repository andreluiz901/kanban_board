import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const updateBoardBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const updateBoardBodyValidationPipe = new ZodValidationPipe(
  updateBoardBodySchema,
)

export type UpdateBoardBodySchema = z.infer<typeof updateBoardBodySchema>
