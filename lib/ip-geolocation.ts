interface GeoLocationData {
  country: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
}

/**
 * Obtains geographic location based on IP address
 * Uses free services: ipapi.co or ipgeolocation.io
 */
export async function getLocationFromIP(ip: string): Promise<GeoLocationData> {
  // Ignore local IPs
  if (
    ip === '::1' ||
    ip === '127.0.0.1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.')
  ) {
    return {
      country: 'Local',
      city: 'Local',
      region: null,
      latitude: null,
      longitude: null,
    };
  }

  try {
    // First attempt: ipapi.co (free, 1000 requests/day)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ShortBeam/1.0)',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_name || data.country_code || null,
        city: data.city || null,
        region: data.region || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      };
    }

    // Second attempt: ip-api.com (free, no key)
    const ipApiResponse = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon`
    );

    if (ipApiResponse.ok) {
      const data = await ipApiResponse.json();
      if (data.status === 'success') {
        return {
          country: data.country || data.countryCode || null,
          city: data.city || null,
          region: data.regionName || null,
          latitude: data.lat || null,
          longitude: data.lon || null,
        };
      }
    }
  } catch (error) {
    console.error('Erro ao obter localização por IP:', error);
  }

  // Fallback
  return {
    country: null,
    city: null,
    region: null,
    latitude: null,
    longitude: null,
  };
}
