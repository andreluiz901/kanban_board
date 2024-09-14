import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const createCollumnBodySchema = z.object({
  name: z.string(),
})

export const createCollumnBodyValidationPipe = new ZodValidationPipe(
  createCollumnBodySchema,
)

export type CreateCollumnBodySchema = z.infer<typeof createCollumnBodySchema>
