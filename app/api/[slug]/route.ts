// app/api/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;

    // Find the original URL
    const shortUrl = await prisma.shortUrl.findUnique({
      where: { slug },
    });

    if (!shortUrl) {
      return NextResponse.json(
        { error: 'Link não encontrado' },
        { status: 404 }
      );
    }

    // Update click counter
    await prisma.shortUrl.update({
      where: { slug },
      data: { clicks: { increment: 1 } },
    });

    // Collect analytics data
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent');
    const referrer = request.headers.get('referer');

    // Record analytics in the background
    prisma.analytics
      .create({
        data: {
          slug,
          ip,
          userAgent,
          referrer,
        },
      })
      .catch(console.error);

    // Return the URL as JSON (DO NOT redirect!)
    return NextResponse.json({
      url: shortUrl.url,
      slug: shortUrl.slug,
      success: true,
    });
  } catch (error) {
    console.error('Error redirecting:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
