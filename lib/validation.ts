import { z } from 'zod';

export const createShortUrlSchema = z.object({
  url: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .min(1, { message: 'URL is required' }),
  customSlug: z
    .string()
    .optional()
    .refine((slug) => !slug || /^[a-zA-Z0-9_-]+$/.test(slug), {
      message:
        'Slug can only contain letters, numbers, hyphens, and underscores',
    })
    .refine((slug) => !slug || slug.length >= 3, {
      message: 'Slug must be at least 3 characters long',
    })
    .refine((slug) => !slug || slug.length <= 50, {
      message: 'Slug must be at most 50 characters long',
    }),
});

export type CreateShortUrlInput = z.infer<typeof createShortUrlSchema>;

// Scheme for user registration WITH password
export const registerUserSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Please enter a valid email' })
      .min(1, { message: 'Email is required' }),
    name: z
      .string()
      .optional()
      .refine((name) => !name || name.length >= 2, {
        message: 'Name must be at least 2 characters long',
      })
      .refine((name) => !name || name.length <= 100, {
        message: 'Name must be at most 100 characters long',
      }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
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
    .email({ message: 'Please enter a valid email' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
