import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { z } from 'zod'

const updateCollumnBodySchema = z.object({
  name: z.string().min(1, 'Please inform a name of the Collumn'),
})

export const updateCollumnBodyValidationPipe = new ZodValidationPipe(
  updateCollumnBodySchema,
)

export type UpdateCollumnBodySchema = z.infer<typeof updateCollumnBodySchema>
