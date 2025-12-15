import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const shortUrl = await prisma.shortUrl.findUnique({
      where: { slug },
    });

    if (!shortUrl) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // GEO VERCEL
    const country = request.headers.get('x-vercel-ip-country') ?? null;
    const city = request.headers.get('x-vercel-ip-city') ?? null;

    // HEADERS
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

    const userAgent = request.headers.get('user-agent');
    const referrer = request.headers.get('referer');

    // ATT CLICKS + ANALYTICS
    await Promise.all([
      prisma.shortUrl.update({
        where: { slug },
        data: { clicks: { increment: 1 } },
      }),

      prisma.analytics.create({
        data: {
          slug,
          ip,
          userAgent,
          referrer,
          country, // BR, US
          city,
        },
      }),
    ]);

    // Return JSON (no redirect)
    return NextResponse.json({
      url: shortUrl.url,
      slug: shortUrl.slug,
      success: true,
    });
  } catch (error) {
    console.error('Error redirecting:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
