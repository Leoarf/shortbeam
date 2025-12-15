import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registerUserSchema } from '@/lib/validation';
import { hashPassword } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validationResult = registerUserSchema.safeParse(body);

    if (!validationResult.success) {
      const flattenedErrors = validationResult.error.flatten();
      const fieldErrors = flattenedErrors.fieldErrors;

      const errors = Object.entries(fieldErrors).map(([field, messages]) => ({
        field,
        message: messages?.[0] || 'Validation error', // Get only the first message
      }));

      return NextResponse.json(
        {
          error: 'Please correct the errors below',
          details: errors,
        },
        { status: 400 }
      );
    }

    const { email, name, password } = validationResult.data;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: 'This email is already registered',
          details: [
            {
              field: 'email',
              message:
                'This email address is already in use. Please try logging in or using a different email address.',
            },
          ],
        },
        { status: 409 }
      );
    }

    // Password hash
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Account created successfully!',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);

    // Check if it's a Prisma single constraint error
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        {
          error: 'This email is already registered',
          details: [
            {
              field: 'email',
              message:
                'This email address is already in use. Please try logging in or using a different email address.',
            },
          ],
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
