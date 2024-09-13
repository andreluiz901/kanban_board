import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const createBoardBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const createBoardBodyValidationPipe = new ZodValidationPipe(
  createBoardBodySchema,
)

export type CreateBoardBodySchema = z.infer<typeof createBoardBodySchema>
