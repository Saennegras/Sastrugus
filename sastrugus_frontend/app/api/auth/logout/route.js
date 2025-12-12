import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  // Clear both cookies
  cookieStore.delete('jwt');
  cookieStore.delete('refresh_token');
  return NextResponse.json({ message: 'Logged out' });
}