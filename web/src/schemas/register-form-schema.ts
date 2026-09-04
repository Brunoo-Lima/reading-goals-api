import { z } from 'zod';

export const registerFormSchema = z
  .object({
    name: z.string('Nome é obrigatório').trim().min(1, 'Nome é obrigatório'),
    email: z
      .email('Email é obrigatório. Por favor, insira um email válido')
      .min(1, 'Email é obrigatório'),
    password: z
      .string('Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string('Confirmação de senha é obrigatória'),
    securityKey: z
      .string('Chave de segurança é obrigatória')
      .trim()
      .min(1, 'Chave de segurança é obrigatória'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type IRegisterFormSchema = z.infer<typeof registerFormSchema>;
