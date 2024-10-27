import { User, connectMongoDB } from '@/lib/db';
import { session_store } from '@/middleware';
import { NextRequest, NextResponse } from 'next/server';
import uuid from 'uuid4';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const formData = await request.formData();

  const user = await User.findOne({ email: formData.get('email') });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  if (
    !(await user.isCorrectPassword(formData.get('password'), user.password))
  ) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }

  const user_session_id = uuid();

  session_store[user_session_id] = {
    email: user.email,
    name: user.name,
    userId: user._id,
  };

  const response = new Response();
  (await cookies()).set('session', user_session_id, {
    httpOnly: true, // Make cookie inaccessible to JavaScript
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
    path: '/', // Cookie accessible on the entire domain
  });

  return response;
}
