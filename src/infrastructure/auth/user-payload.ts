import { z } from "zod"

const tokenPayloadSchema = z.object({
  id: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>