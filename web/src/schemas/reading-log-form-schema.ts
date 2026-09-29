import { z } from 'zod';

export const readingLogFormSchema = z.object({
  book_id: z.string().min(1, 'Selecione um livro'),
  pages_read: z
    .number({ message: 'Informe o número de páginas' })
    .int('Use um número inteiro')
    .min(1, 'Mínimo de 1 página'),
  date: z.string().min(1, 'Informe a data'),
  notes_about_session: z
    .string()
    .max(500, 'Máximo de 500 caracteres')
    .optional(),
});

export type IReadingLogFormSchema = z.infer<typeof readingLogFormSchema>;
