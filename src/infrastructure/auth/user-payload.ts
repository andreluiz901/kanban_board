import { z } from 'zod'

const tokenPayloadSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>
