import { z } from 'zod';

export const noteFormSchema = z.object({
  content: z.string('Conteúdo é obrigatório').trim().min(1, {
    error: 'Conteúdo é obrigatório',
  }),
  page_number: z
    .number({
      message: 'Número da página é obrigatório',
    })
    .min(1, { error: 'Número da página é obrigatório' })
    .optional(),
});

export type INoteFormSchema = z.infer<typeof noteFormSchema>;
