import { z } from 'zod';

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string('Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string('Confirmação de senha é obrigatória'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type IResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
