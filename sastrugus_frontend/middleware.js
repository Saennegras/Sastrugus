import { NextResponse } from 'next/server';

function isTokenExpired(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = JSON.parse(atob(payloadBase64));
    const expiryTime = decodedJson.exp;
    const currentTime = Date.now() / 1000;
    return currentTime >= expiryTime;
  } catch (e) {
    return true; // Treat as expired if we can't read it
  }
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define protected and auth routes
  const isProtectedRoute = path.startsWith('/dashboard') ||
                           path.startsWith('/profile') ||
                           path.startsWith('/workshop/new') ||
                           path.startsWith('/workshop/edit');
  const isAuthRoute = path === '/login' || path === '/register';

  const accessToken = request.cookies.get('jwt')?.value;

  // Check if token exists and is valid
  const hasValidToken = accessToken && !isTokenExpired(accessToken);

  // User is NOT logged in (or token expired), but tries to go to protected route
  if (isProtectedRoute && !hasValidToken) {
    const response = NextResponse.redirect(new URL('/login', request.nextUrl));
    // Clear expired cookies
    if (accessToken) {
      response.cookies.delete('jwt');
      response.cookies.delete('refresh_token');
    }
    return response;
  }

  // User IS logged in, but tries to go to Login/Register page
  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  //Tell Next.js which files to ignore
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};