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
