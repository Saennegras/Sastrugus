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


async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    return null;
  }
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  console.log('Middleware triggered for path:', path);
  
  //Temporary: List some pages that need protection
  const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/profile');
  const isAuthRoute = path === '/login' || path === '/register';
  
  const accessToken = request.cookies.get('jwt')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;


  let response = NextResponse.next();
  let currentToken = accessToken;

  // 4. Token Rotation Logic (If token is expired, try to get a new one)
  if (!accessToken || isTokenExpired(accessToken)) {
    if (refreshToken) {
      const newTokens = await refreshAccessToken(refreshToken);

      if (newTokens && newTokens.jwt) {
        // We got a new token!
        currentToken = newTokens.jwt;

        // Reset response so we can modify cookies
        response = NextResponse.next();

        // Save the new token in the user's browser (HttpOnly Cookie)
        response.cookies.set('jwt', newTokens.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 15, 
          path: '/',
          sameSite: 'strict',
        });

        // Save new refresh token if Strapi sent one
        if (newTokens.refreshToken) {
           response.cookies.set('refresh_token', newTokens.refreshToken, {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production',
             maxAge: 60 * 60 * 24 * 7,
             path: '/',
             sameSite: 'strict',
           });
        }
      } else {
 
        if (isProtectedRoute) {
           response = NextResponse.redirect(new URL('/login', request.nextUrl));
           response.cookies.delete('jwt');
           response.cookies.delete('refresh_token');
           return response;
        }
      }
    }
  }

  // User is NOT logged in, but tries to go to Dashboard
  if (isProtectedRoute && !currentToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // User IS logged in, but tries to go to Login page
  if (isAuthRoute && currentToken) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  return response;
}

export const config = {
  //Tell Next.js which files to ignore
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};