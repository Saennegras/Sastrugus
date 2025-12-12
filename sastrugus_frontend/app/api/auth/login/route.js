import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const cookieStore = await cookies();
  const { identifier, password } = await request.json();

  // 1. Authenticate with Strapi
  let strapiRes;
  try {
    strapiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });
  } catch (err) {
    console.error("Error connecting to Strapi:", err);
    return NextResponse.json(
      { error: 'Nem sikerült csatlakozni az authentikációs szerverhez!' },
      { status: 502 }
    );
  }

  const data = await strapiRes.json();

  if (!strapiRes.ok) {
    return NextResponse.json(
      { error: data.error?.message || 'Bejelentkezés sikertelen' },
      { status: strapiRes.status }
    );
  }

  cookieStore.set('jwt', data.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, 
    path: '/',
    sameSite: 'strict',
  });

  // 3. Return user info (Do NOT return tokens in JSON)
  return NextResponse.json({ user: data.user });
}