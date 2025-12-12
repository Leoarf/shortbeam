import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type GeoData = {
  country?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
};

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
      return NextResponse.json(
        { error: 'Link não encontrado' },
        { status: 404 }
      );
    }

    // GEO VERCEL
    const geo = (request as NextRequest & { geo?: GeoData }).geo;

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
          country: geo?.country ?? null, // BR, US
          city: geo?.city ?? null,
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
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
