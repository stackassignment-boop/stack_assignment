import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { db } from './db';
import { NextRequest } from 'next/server';

const SALT_ROUNDS = 12;

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate unique order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SA-${timestamp}-${random}`;
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Session management using cookies
export async function setSessionCookie(userId: string, role: string) {
  const cookieStore = await cookies();
  const sessionData = JSON.stringify({ userId, role });
  
  cookieStore.set('session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  
  if (!sessionCookie) {
    return null;
  }
  
  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

// Get current user from session
export async function getCurrentUser() {
  const session = await getSession();
  
  if (!session?.userId) {
    return null;
  }
  
  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      avatar: true,
      isActive: true,
      createdAt: true,
    },
  });
  
  return user;
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}

// The authenticated user as the route handlers see it — whatever getCurrentUser
// selects, minus the null it returns when there is no session.
export type AuthenticatedUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

/**
 * Discriminated union, deliberately. Every caller writes
 *
 *   if (!authResult.success) return apiError(...);
 *   const id = authResult.user.id;
 *
 * and that only type-checks if `success` is the literal `false`/`true` rather
 * than `boolean`. Before this type existed the compiler inferred `boolean`,
 * could not narrow, and `authResult.user` stayed possibly-undefined — so the
 * guard was invisible to it and `.user.id` was an error in every admin route.
 */
export type AuthResult =
  | { success: false; error: string; status: number }
  | { success: true; user: AuthenticatedUser };

// Middleware-like function to check authentication
export async function requireAuth(request?: NextRequest): Promise<AuthResult> {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, error: 'Unauthorized', status: 401 };
  }

  return { success: true, user };
}

// Middleware-like function to check admin role
export async function requireAdmin(): Promise<AuthResult> {
  const user = await getCurrentUser();
  
  if (!user) {
    return { success: false, error: 'Unauthorized', status: 401 };
  }
  
  if (user.role !== 'admin') {
    return { success: false, error: 'Forbidden - Admin access required', status: 403 };
  }
  
  return { success: true, user };
}

// Pricing calculation
export interface PricingInput {
  academicLevel: 'high_school' | 'bachelor' | 'master' | 'phd';
  deadline: number; // days
  pages: number;
}

export interface PricingOutput {
  pricePerPage: number;
  urgencyMultiplier: number;
  totalPrice: number;
  currency: string;
}

// Price per page based on academic level (in INR)
const PRICE_PER_PAGE: Record<string, number> = {
  high_school: 250,
  bachelor: 350,
  master: 450,
  phd: 750,
};

// Urgency multiplier based on deadline
function getUrgencyMultiplier(days: number): number {
  if (days >= 14) return 1.0;
  if (days >= 7) return 1.3;
  if (days >= 3) return 1.6;
  if (days >= 2) return 2.2;
  return 3.0; // under 24 hours
}

export function calculatePrice(input: PricingInput): PricingOutput {
  const pricePerPage = PRICE_PER_PAGE[input.academicLevel] || 250;
  const urgencyMultiplier = getUrgencyMultiplier(input.deadline);
  const totalPrice = Math.round(pricePerPage * urgencyMultiplier * input.pages);
  
  return {
    pricePerPage,
    urgencyMultiplier,
    totalPrice,
    currency: 'INR',
  };
}

// API Response helpers
export function apiResponse(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export function apiError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export function apiSuccess(data: unknown, message?: string) {
  return Response.json({ success: true, data, message });
}
