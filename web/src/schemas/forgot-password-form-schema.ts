import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z
    .email('Email é obrigatório. Por favor, insira um email válido')
    .min(1, 'Email é obrigatório'),
  securityKey: z
    .string('Chave de segurança é obrigatória')
    .trim()
    .min(1, 'Chave de segurança é obrigatória'),
});

export type IForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
