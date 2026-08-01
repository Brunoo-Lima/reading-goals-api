import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('Email is required. Please enter a valid email')
    .trim()
    .min(1, 'Email is required'),
  password: z
    .string('Password is required')
    .trim()
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string('Refresh token is required')
    .trim()
    .min(1, 'Refresh token is required'),
});

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(1, {
    error: 'Token is required',
  }),
  password: z.string().trim().min(6, {
    error: 'Password must be at least 6 characters',
  }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .email({
      message: 'Invalid email. Please enter a valid email',
    })
    .trim()
    .min(1, {
      error: 'Email is required',
    }),
  securityKey: z.string().trim().min(1, {
    error: 'Security key is required',
  }),
});
