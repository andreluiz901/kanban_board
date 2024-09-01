import { z } from 'zod';

export const createUserSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;