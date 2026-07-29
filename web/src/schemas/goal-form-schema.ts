import { z } from 'zod';

export const goalFormSchema = z
  .object({
    type: z
      .enum([
        'DAILY_PAGES',
        'BOOKS_PER_MONTH',
        'BOOKS_PER_YEAR',
        'TOTAL_PAGES',
        'SPECIFIC_BOOK',
      ])
      .default('BOOKS_PER_YEAR'),
    target_value: z.coerce.number('Valor alvo é obrigatório').min(1, {
      error: 'Valor alvo é obrigatório',
    }),
    current_value: z.coerce
      .number('Valor atual é obrigatório')
      .min(0, {
        error: 'Valor atual é obrigatório',
      })
      .optional(),
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
    book_id: z.string().optional(),
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
export type IGoalFormSchema = z.infer<typeof goalFormSchema>;
