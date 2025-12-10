import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;

    // Buscar a URL encurtada
    const shortUrl = await prisma.shortUrl.findUnique({
      where: { slug },
      select: {
        id: true,
        url: true,
        slug: true,
        clicks: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!shortUrl) {
      return NextResponse.json(
        { error: 'Link não encontrado' },
        { status: 404 }
      );
    }
    // Search analytics
    const analytics = await prisma.analytics.findMany({
      where: { slug },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        ip: true,
        userAgent: true,
        referrer: true,
        country: true,
        city: true,
        createdAt: true,
      },
      take: 100, // Limit to the 100 most recent records.
    });
    // Calculate statistics
    const totalClicks = shortUrl.clicks;
    const uniqueCountries = [
      ...new Set(analytics.filter((a) => a.country).map((a) => a.country)),
    ];
    const uniqueCities = [
      ...new Set(analytics.filter((a) => a.city).map((a) => a.city)),
    ];
    // Group by date
    const clicksByDate: Record<string, number> = {};
    analytics.forEach((item) => {
      const date = item.createdAt.toISOString().split('T')[0];
      clicksByDate[date] = (clicksByDate[date] || 0) + 1;
    });
    // Top referrers
    const referrers = analytics
      .filter((a) => a.referrer)
      .reduce((acc: Record<string, number>, item) => {
        const domain = new URL(item.referrer!).hostname;
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
      }, {});
    const topReferrers = Object.entries(referrers)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    // Top countries
    const countries = analytics
      .filter((a) => a.country)
      .reduce((acc: Record<string, number>, item) => {
        acc[item.country!] = (acc[item.country!] || 0) + 1;
        return acc;
      }, {});
    const topCountries = Object.entries(countries)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    return NextResponse.json({
      url: shortUrl,
      analytics: {
        total: analytics.length,
        data: analytics,
      },
      statistics: {
        totalClicks,
        uniqueCountries: uniqueCountries.length,
        uniqueCities: uniqueCities.length,
        clicksByDate,
        topReferrers,
        topCountries,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
