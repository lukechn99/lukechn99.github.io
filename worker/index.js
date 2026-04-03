const AEROAPI_BASE = 'https://aeroapi.flightaware.com/aeroapi';

const CORS_HEADERS = {
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function corsOrigin(env) {
  return env.GITHUB_PAGES_URL || 'https://lukechn99.github.io';
}

function jsonResponse(body, status, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin(env),
      ...CORS_HEADERS,
    },
  });
}

async function fetchFlightAware(path, apiKey) {
  const res = await fetch(`${AEROAPI_BASE}${path}`, {
    headers: { 'x-apikey': apiKey },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AeroAPI ${res.status}: ${text}`);
  }

  return res.json();
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': corsOrigin(env),
          ...CORS_HEADERS,
        },
      });
    }

    if (request.method !== 'GET') {
      return jsonResponse({ error: 'Method not allowed' }, 405, env);
    }

    const url = new URL(request.url);
    const airport = url.searchParams.get('airport');
    const datetime = url.searchParams.get('datetime');

    if (!airport) {
      return jsonResponse({ error: 'Missing required query param: airport (IATA code)' }, 400, env);
    }

    const apiKey = env.FLIGHTAWARE_API_KEY;
    if (!apiKey) {
      return jsonResponse({ error: 'Server misconfiguration: missing API key' }, 500, env);
    }

    const code = airport.toUpperCase();

    try {
      const timeParams = datetime ? `?start=${encodeURIComponent(datetime)}&end=${encodeURIComponent(addHours(datetime, 2))}` : '';

      const [arrivals, departures] = await Promise.all([
        fetchFlightAware(`/airports/${code}/flights/arrivals${timeParams}`, apiKey),
        fetchFlightAware(`/airports/${code}/flights/departures${timeParams}`, apiKey),
      ]);

      const arrivalCount = arrivals.arrivals?.length ?? 0;
      const departureCount = departures.departures?.length ?? 0;

      return jsonResponse({
        airport: code,
        datetime: datetime || null,
        arrivals: {
          count: arrivalCount,
          flights: arrivals.arrivals ?? [],
        },
        departures: {
          count: departureCount,
          flights: departures.departures ?? [],
        },
        busier: arrivalCount > departureCount ? 'arrivals' : departureCount > arrivalCount ? 'departures' : 'equal',
      }, 200, env);
    } catch (err) {
      console.error('FlightAware proxy error:', err);
      return jsonResponse({ error: err.message || 'Internal server error' }, 502, env);
    }
  },
};

function addHours(isoString, hours) {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  date.setHours(date.getHours() + hours);
  return date.toISOString();
}
