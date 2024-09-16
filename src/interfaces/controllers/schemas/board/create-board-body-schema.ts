import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const createBoardBodySchema = z.object({
  name: z.string().min(1, 'Please inform a name of the Board'),
  description: z.string().optional(),
})

export const createBoardBodyValidationPipe = new ZodValidationPipe(
  createBoardBodySchema,
)

export type CreateBoardBodySchema = z.infer<typeof createBoardBodySchema>
