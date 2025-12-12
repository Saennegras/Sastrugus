import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { username, email, password, FirstName, LastName } = await request.json();

  // Step 1: Register with core fields only
  let strapiRes;
  try {
    strapiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
  } catch (err) {
    console.error("Error connecting to Strapi:", err);
    return NextResponse.json(
      { error: 'Nem sikerült csatlakozni a szerverhez!' },
      { status: 502 }
    );
  }

  const data = await strapiRes.json();

  if (!strapiRes.ok) {
    return NextResponse.json(
      { error: data.error?.message || 'Regisztráció sikertelen' },
      { status: strapiRes.status }
    );
  }

  // Step 2: Update user with custom fields using the new JWT
  try {
    const updateRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${data.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.jwt}`,
      },
      body: JSON.stringify({ FirstName, LastName }),
    });

    if (updateRes.ok) {
      const updatedUser = await updateRes.json();
      data.user = updatedUser;
    }
  } catch (err) {
    console.error("Error updating user profile:", err);
  }

  cookies().set('jwt', data.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 15,
    path: '/',
    sameSite: 'strict',
  });

  if (data.refreshToken) {
    cookies().set('refresh_token', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'strict',
    });
  }

  return NextResponse.json({ user: data.user });
}
