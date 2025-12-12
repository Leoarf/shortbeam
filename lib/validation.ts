import { z } from 'zod';

export const createShortUrlSchema = z.object({
  url: z
    .string()
    .url({ message: 'Por favor, insira uma URL válida' })
    .min(1, { message: 'URL é obrigatória' }),
  customSlug: z
    .string()
    .optional()
    .refine((slug) => !slug || /^[a-zA-Z0-9_-]+$/.test(slug), {
      message: 'Slug pode conter apenas letras, números, hífens e underscores',
    })
    .refine((slug) => !slug || slug.length >= 3, {
      message: 'Slug deve ter pelo menos 3 caracteres',
    })
    .refine((slug) => !slug || slug.length <= 50, {
      message: 'Slug deve ter no máximo 50 caracteres',
    }),
});

export type CreateShortUrlInput = z.infer<typeof createShortUrlSchema>;

// Scheme for user registration WITH password
export const registerUserSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Por favor, insira um email válido' })
      .min(1, { message: 'Email é obrigatório' }),
    name: z
      .string()
      .optional()
      .refine((name) => !name || name.length >= 2, {
        message: 'Nome deve ter pelo menos 2 caracteres',
      })
      .refine((name) => !name || name.length <= 100, {
        message: 'Nome deve ter no máximo 100 caracteres',
      }),
    password: z
      .string()
      .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
      .max(100, { message: 'Senha deve ter no máximo 100 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

// Schema for login
export const loginUserSchema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor, insira um email válido' })
    .min(1, { message: 'Email é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
