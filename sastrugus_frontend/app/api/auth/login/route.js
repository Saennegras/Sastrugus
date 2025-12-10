import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { identifier, password } = await request.json();
  //try {
    // 1. Authenticate with Strapi
    let strapiRes;
    try {
    strapiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });
    } catch(err) {
      console.error("Error connecting to Strapi:", err);
      return NextResponse.json(
        { error: 'Nem sikerült csatlakozni az authentikációs szerverhez!' },
        { status: 502 }
      );
    }


    const data = await strapiRes.json();
    console.log("Strapi login response data:", data);

    if (!strapiRes.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Bejelentkezés sikertelen' },
        { status: strapiRes.status }
      );
    }

    // 2. Set Access Token (Short-lived)
    cookies().set('jwt', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15, // 15 Minutes
      path: '/',
      sameSite: 'strict',
    });

    // 3. Set Refresh Token (Long-lived)
    if (data.refreshToken) {
      cookies().set('refresh_token', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 Days
        path: '/',
        sameSite: 'strict',
      });
    }

    // 4. Return user info (Do NOT return tokens in JSON)
    return NextResponse.json({ user: data.user });

  //} catch (error) {
  //  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  //}
}