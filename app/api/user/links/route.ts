import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthenticated user',
        },
        { status: 401 }
      );
    }

    // Fetch user links
    const links = await prisma.shortUrl.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        url: true,
        slug: true,
        clicks: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Calculate statistics
    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
    const averageClicks =
      totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0;

    // Recent links (last 5)
    const recentLinks = links.slice(0, 5);

    // Most clicked link
    const mostClicked =
      links.length > 0
        ? links.reduce((max, link) => (link.clicks > max.clicks ? link : max))
        : null;

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
      },
      statistics: {
        totalLinks,
        totalClicks,
        averageClicks,
      },
      links: links,
      recentLinks: recentLinks,
      mostClicked: mostClicked
        ? {
            slug: mostClicked.slug,
            clicks: mostClicked.clicks,
            url: mostClicked.url,
          }
        : null,
    });
  } catch (error) {
    console.error('Error retrieving user links:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
