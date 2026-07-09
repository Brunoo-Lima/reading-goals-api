import { z } from 'zod';

export const createNoteSchema = z.strictObject(
  {
    content: z.string('Content is required').trim().min(1, {
      error: 'Content is required',
    }),
    page_number: z
      .number({
        message: 'Page number is required',
      })
      .min(1, { error: 'Page number is required' })
      .optional(),
  },
  {
    error: 'Some provided field is not allowed.',
  },
);

export const updateNoteSchema = createNoteSchema.partial();
