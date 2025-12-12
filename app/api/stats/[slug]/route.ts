import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params:  Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find the shortened URL
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

    // Seeking analytics with reasonable limits
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
      take: 200, // I increased it to 200 records
    });

    // Calculate statistics
    const totalClicks = shortUrl.clicks;

    // Unique countries (excluding null and "Local")
    const uniqueCountries = [
      ...new Set(
        analytics
          .filter((a) => a.country && a.country !== 'Local')
          .map((a) => a.country)
      ),
    ];

    // Unique cities (excluding null and "Local")
    const uniqueCities = [
      ...new Set(
        analytics.filter((a) => a.city && a.city !== 'Local').map((a) => a.city)
      ),
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
        try {
          const domain = new URL(item.referrer!).hostname;
          acc[domain] = (acc[domain] || 0) + 1;
        } catch {
          // Ignore invalid URLs
        }
        return acc;
      }, {});

    const topReferrers = Object.entries(referrers)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top countries (excluding null and "Local")
    const countries = analytics
      .filter((a) => a.country && a.country !== 'Local')
      .reduce((acc: Record<string, number>, item) => {
        acc[item.country!] = (acc[item.country!] || 0) + 1;
        return acc;
      }, {});

    const topCountries = Object.entries(countries)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((item) => ({
        ...item,
        country: getCountryName(item.country), // Add country name
      }));

    // Devices
    const devices = analytics.reduce((acc: Record<string, number>, item) => {
      const ua = item.userAgent?.toLowerCase() || '';
      let device = 'Desktop';

      if (ua.includes('mobile')) device = 'Mobile';
      if (ua.includes('tablet')) device = 'Tablet';
      if (ua.includes('android')) device = 'Android';
      if (ua.includes('iphone') || ua.includes('ipad')) device = 'iOS';

      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});

    const deviceStats = Object.entries(devices)
      .map(([device, count]) => ({ device, count }))
      .sort((a, b) => b.count - a.count);

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
        deviceStats,
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

// Helper function to convert country code to name
function getCountryName(countryCode: string): string {
  const countries: Record<string, string> = {
    BR: 'Brasil',
    US: 'Estados Unidos',
    PT: 'Portugal',
    ES: 'Espanha',
    FR: 'França',
    DE: 'Alemanha',
    IT: 'Itália',
    UK: 'Reino Unido',
    JP: 'Japão',
    CN: 'China',
    RU: 'Rússia',
    IN: 'Índia',
    CA: 'Canadá',
    AU: 'Austrália',
    MX: 'México',
    AR: 'Argentina',
    CL: 'Chile',
    CO: 'Colômbia',
    PE: 'Peru',
    VE: 'Venezuela',
    UY: 'Uruguai',
    PY: 'Paraguai',
    BO: 'Bolívia',
    EC: 'Equador',
  };

  return countries[countryCode] || countryCode;
}
