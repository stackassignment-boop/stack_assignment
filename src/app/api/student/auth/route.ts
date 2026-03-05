import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Simple session storage (in production, use proper session management)
const sessions = new Map<string, { userId: string; email: string; name: string }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name, phone } = body;

    if (action === 'register') {
      // Validate input
      if (!email || !password || !name) {
        return NextResponse.json(
          { error: 'Name, email, and password are required' },
          { status: 400 }
        );
      }

      // Check if user already exists
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user with student role
      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
          role: 'student',
        },
      });

      return NextResponse.json({
        message: 'Account created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }

    if (action === 'login') {
      // Validate input
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        );
      }

      // Find user
      const user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Check if user is a student (allow both student and customer roles)
      if (user.role !== 'student' && user.role !== 'customer') {
        return NextResponse.json(
          { error: 'Please use admin login for this account' },
          { status: 401 }
        );
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Update last login
      await db.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // Create session token (simple implementation)
      const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
      sessions.set(sessionToken, {
        userId: user.id,
        email: user.email,
        name: user.name || 'Student',
      });

      const response = NextResponse.json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: sessionToken,
      });

      // Set cookie
      response.cookies.set('student_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('student_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null });
    }

    const session = sessions.get(sessionToken);

    if (!session) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        name: session.name,
        email: session.email,
      },
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ user: null });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('student_session')?.value;

    if (sessionToken) {
      sessions.delete(sessionToken);
    }

    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.delete('student_session');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
