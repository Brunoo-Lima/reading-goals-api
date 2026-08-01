import { z } from 'zod';

export const userFormSchema = z.object({
  name: z.string('Nome é obrigatório').trim().min(1, {
    error: 'Nome é obrigatório',
  }),
  email: z
    .email('Email é obrigatório. Por favor, insira um email válido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type IUserFormSchema = z.infer<typeof userFormSchema>;
