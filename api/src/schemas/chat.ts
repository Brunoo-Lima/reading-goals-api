import z from 'zod';

export const chatSchema = z.object({
  message: z.string().trim().min(1).max(4000),
  previousResponseId: z.string().optional(),
});
