import { z } from 'zod';

export const createNoteSchema = z.strictObject(
  {
    content: z.string('Content is required').trim().min(1, {
      error: 'Content is required',
    }),
    rating: z
      .number({
        message: 'Rating is required',
      })
      .min(1, { error: 'Rating is required' })
      .max(5, { error: 'Rating must be between 1 and 5' })
      .optional(),
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
