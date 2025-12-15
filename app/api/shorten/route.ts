import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { customAlphabet } from 'nanoid';
import { createShortUrlSchema } from '@/lib/validation';
import { z } from 'zod';

const nanoid = customAlphabet(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  6
);

// Expand the schema to include the userId
const extendedCreateShortUrlSchema = createShortUrlSchema.extend({
  userId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('POST /api/shorten - Data received:', body);

    // Validate with the extended schema
    const validationResult = extendedCreateShortUrlSchema.safeParse(body);
    if (!validationResult.success) {
      const errorDetails = Object.entries(
        validationResult.error.flatten().fieldErrors
      ).map(([field, messages]) => ({
        field,
        message: messages?.join(', ') || 'Validation error',
      }));
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errorDetails,
        },
        { status: 400 }
      );
    }

    const { url, customSlug, userId } = validationResult.data;

    console.log('Processing:', { url, customSlug, userId });

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
            error: 'This slug is already in use.',
            field: 'customSlug',
          },
          { status: 409 }
        );
      }
      // If it's a random slug and it already exists, try again
      slug = nanoid();
    }

    // Prepare data for creation
    const data: any = {
      url,
      slug,
    };

    // If userId was provided, associate it with the link
    if (userId) {
      console.log('UserID provided, verifying user...');

      // Check if the user exists
      try {
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true },
        });

        if (userExists) {
          data.userId = userId;
          console.log('✅ The link will be associated with the user.');
        } else {
          console.log('⚠️ User not found, creating link without association.');
        }
      } catch (error) {
        console.log('⚠️ Error verifying user, link created anyway.');
      }
    }

    console.log('Creating a link with data:', data);

    // Create short URL
    const shortUrl = await prisma.shortUrl.create({
      data,
      select: {
        id: true,
        url: true,
        slug: true,
        clicks: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });

    console.log('✅ Link created successfully:', shortUrl);

    // Shortened full URL
    const shortenedUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }/${slug}`;

    return NextResponse.json(
      {
        ...shortUrl,
        shortUrl: shortenedUrl,
        success: true,
        message: shortUrl.userId
          ? 'Link created and associated with your account!'
          : 'Link created (no user association)',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error creating short URL:', error);

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'This slug is already in use. Try another one.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
