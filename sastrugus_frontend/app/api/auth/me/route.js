import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const token = cookies().get('jwt')?.value;
  

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!strapiRes.ok) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await strapiRes.json();
  return NextResponse.json({ user });
}