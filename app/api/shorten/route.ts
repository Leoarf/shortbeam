import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { customAlphabet } from 'nanoid';
import { createShortUrlSchema } from '@/lib/validation';

const nanoid = customAlphabet(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  6
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate with Zod
    const validationResult = createShortUrlSchema.safeParse(body);
    if (!validationResult.success) {
      // Alternative way to access errors
      const errorDetails = Object.entries(
        validationResult.error.flatten().fieldErrors
      ).map(([field, messages]) => ({
        field,
        message: messages?.join(', ') || 'Erro de validação',
      }));
      return NextResponse.json(
        {
          error: 'Validação falhou',
          details: errorDetails,
        },
        { status: 400 }
      );
    }
    const { url, customSlug } = validationResult.data;
    // Generate slug
    let slug = customSlug?.trim();
    if (!slug) {
      slug = nanoid();
    }
    // Check if the slug already exists
    const existing = await prisma.shortUrl.findUnique({
      where: { slug },
    });
    if (existing) {
      if (customSlug) {
        return NextResponse.json(
          {
            error: 'Este slug já está em uso',
            field: 'customSlug',
          },
          { status: 409 }
        );
      }
      // If it's a random slug and it already exists, try again
      slug = nanoid();
    }
    // Create short URL
    const shortUrl = await prisma.shortUrl.create({
      data: {
        url,
        slug,
      },
      select: {
        id: true,
        url: true,
        slug: true,
        clicks: true,
        createdAt: true,
      },
    });
    // Full shortened URL
    const shortenedUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }/${slug}`;

    return NextResponse.json(
      {
        ...shortUrl,
        shortUrl: shortenedUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating short URL:', error);
    // Check if it's a Prisma single constraint error
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Este slug já está em uso. Tente outro.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
