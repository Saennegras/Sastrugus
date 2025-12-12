import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function proxyRequest(request, params) {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  // Build the target URL - params needs to be awaited in Next.js 14+
  const resolvedParams = await params;
  const pathSegments = resolvedParams.path || [];
  const targetPath = pathSegments.join('/');
  const url = new URL(request.url);
  const queryString = url.search;
  const targetUrl = `${BACKEND_URL}/${targetPath}${queryString}`;

  // Build headers - forward relevant headers and add auth
  const headers = new Headers();

  // Forward content-type if present
  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('Content-Type', contentType);
  }

  // Forward accept header if present
  const accept = request.headers.get('accept');
  if (accept) {
    headers.set('Accept', accept);
  }

  // Add Authorization header if we have a token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Build fetch options
  const fetchOptions = {
    method: request.method,
    headers,
  };

  // Forward body for methods that support it
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    if (contentType?.includes('multipart/form-data')) {
      headers.delete('Content-Type');
      fetchOptions.body = await request.blob();
    } else if (contentType?.includes('application/json')) {
      fetchOptions.body = await request.text();
    } else if (request.body) {
      fetchOptions.body = await request.blob();
    }
  }

  try {
    const backendResponse = await fetch(targetUrl, fetchOptions);

    const responseContentType = backendResponse.headers.get('content-type');
    let responseBody;

    // Signal to frontend that auth is invalid
    const authInvalid = backendResponse.status === 401 || backendResponse.status === 403;

    if (responseContentType?.includes('application/json')) {
      responseBody = await backendResponse.json();
      return NextResponse.json(responseBody, {
        status: backendResponse.status,
        headers: {
          'X-Proxied': 'true',
          ...(authInvalid && { 'X-Auth-Invalid': 'true' }),
        }
      });
    } else {
      responseBody = await backendResponse.blob();
      return new NextResponse(responseBody, {
        status: backendResponse.status,
        headers: {
          'Content-Type': responseContentType || 'application/octet-stream',
          'X-Proxied': 'true',
          ...(authInvalid && { 'X-Auth-Invalid': 'true' }),
        },
      });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to backend server' },
      { status: 502 }
    );
  }
}

export async function GET(request, { params }) {
  return proxyRequest(request, params);
}

export async function POST(request, { params }) {
  return proxyRequest(request, params);
}

export async function PUT(request, { params }) {
  return proxyRequest(request, params);
}

export async function PATCH(request, { params }) {
  return proxyRequest(request, params);
}

export async function DELETE(request, { params }) {
  return proxyRequest(request, params);
}

export async function OPTIONS(request, { params }) {
  return proxyRequest(request, params);
}
