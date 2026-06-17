import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .email('Email é obrigatório. Por favor, insira um email válido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
