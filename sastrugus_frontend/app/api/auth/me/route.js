import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!strapiRes.ok) {
      // Token invalid or expired
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await strapiRes.json();
    return NextResponse.json({ user });
  } catch (error) {
    // Network error, Strapi might be restarting
    console.error('Error fetching user from Strapi:', error);
    return NextResponse.json(
      { user: null, error: 'backend_unavailable' },
      { status: 503 }
    );
  }
}