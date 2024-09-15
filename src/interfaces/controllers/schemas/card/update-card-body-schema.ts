import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const updateCardBodySchema = z.object({
  name: z.string().min(1, { message: 'Card Name could not be empty' }),
  description: z.string(),
})

export const updateCardBodyValidationPipe = new ZodValidationPipe(
  updateCardBodySchema,
)

export type UpdateCardBodySchema = z.infer<typeof updateCardBodySchema>
