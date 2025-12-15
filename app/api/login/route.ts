import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginUserSchema } from '@/lib/validation';
import { verifyPassword } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validationResult = loginUserSchema.safeParse(body);

    if (!validationResult.success) {
      const flattenedErrors = validationResult.error.flatten();
      const fieldErrors = flattenedErrors.fieldErrors;

      const errors = Object.entries(fieldErrors).map(([field, messages]) => ({
        field,
        message: messages?.join(', ') || 'Validation error',
      }));

      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errors,
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Search user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true,
        createdAt: true,
      },
    });

    // Check if the username exists and the password is correct
    if (
      !user ||
      !user.passwordHash ||
      !(await verifyPassword(password, user.passwordHash))
    ) {
      return NextResponse.json(
        {
          error: 'Incorrect email or password',
        },
        { status: 401 }
      );
    }

    // Remove passwordHash from the response
    const { passwordHash, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'Login successfully',
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
