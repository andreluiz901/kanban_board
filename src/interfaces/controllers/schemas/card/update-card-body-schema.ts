import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const updateCardBodySchema = z
  .object({
    name: z.string().min(1, { message: 'Card Name could not be empty' }),
    description: z.string(),
  })
  .refine(
    (data) => {
      !!data.name || !!data.description
    },
    { message: 'Need to inform name or description to update' },
  )

export const updateCardBodyValidationPipe = new ZodValidationPipe(
  updateCardBodySchema,
)

export type UpdateCardBodySchema = z.infer<typeof updateCardBodySchema>
