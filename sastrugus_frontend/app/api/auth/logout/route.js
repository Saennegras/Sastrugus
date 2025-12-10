import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Clear both cookies
  cookies().delete('jwt');
  cookies().delete('refresh_token');
  return NextResponse.json({ message: 'Logged out' });
}