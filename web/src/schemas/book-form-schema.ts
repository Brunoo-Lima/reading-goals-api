import { z } from 'zod';

export const bookFormSchema = z
  .object({
    title: z.string('Título é obrigatório').trim().min(1, {
      error: 'Título é obrigatório',
    }),
    author: z.string('Autor é obrigatório').trim().min(1, {
      error: 'Autor é obrigatório',
    }),
    genre: z.array(z.string()),
    status: z
      .enum(['READING', 'COMPLETED', 'WISHLIST', 'ABANDONED'], {
        error: 'Status é obrigatório',
      })
      .default('READING'),
    total_pages: z.coerce.number('Páginas é obrigatório').min(1, {
      error: 'Páginas é obrigatório',
    }),
    start_date: z.date({
      error: 'Deve ser uma data válida',
    }),
    end_date: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({
          error: 'Deve ser uma data válida',
        })
        .optional(),
    ),
  })
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return data.start_date < data.end_date;
      }
      return true;
    },
    {
      message: 'A data final deve ser maior que a data inicial',
      path: ['end_date'],
    },
  );

export type IBookFormSchema = z.infer<typeof bookFormSchema>;
