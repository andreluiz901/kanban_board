import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
