import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const createCardBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const createCardBodyValidationPipe = new ZodValidationPipe(
  createCardBodySchema,
)

export type CreateCardBodySchema = z.infer<typeof createCardBodySchema>
