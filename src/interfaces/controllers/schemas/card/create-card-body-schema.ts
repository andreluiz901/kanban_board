import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const createCardBodySchema = z.object({
  name: z.string().min(1, 'Please inform a name of the Card'),
  description: z.string().optional(),
})

export const createCardBodyValidationPipe = new ZodValidationPipe(
  createCardBodySchema,
)

export type CreateCardBodySchema = z.infer<typeof createCardBodySchema>
