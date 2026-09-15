import { NextRequest } from 'next/server';
import { calculatePrice, apiResponse, apiError } from '@/lib/auth';
import { region } from '@/lib/seo-config';
import { z } from 'zod';

/**
 * ⚠ THIS ENDPOINT RETURNS INDIAN RUPEES AND HAS NO CONSUMERS.
 *
 * `calculatePrice()` in src/lib/auth.ts returns `currency: 'INR'`, and the
 * per-page figures below (250/350/450/750) are rupee amounts. Nothing in the UI
 * calls this route today — the prices students actually see come from the tables
 * in src/components/pricing/PricingPage.tsx — so it is dead code that would emit
 * rupee prices the moment anyone wired it up to an Australian-facing screen.
 *
 * It is left returning INR rather than silently converted, because inventing a
 * conversion here would create a fifth place where an FX rate is hardcoded. What
 * has been fixed is the formatting: the amount is now formatted as an explicit
 * INR currency value for the site's locale instead of a bare `₹` glued to
 * lakh-grouped digits, and every response states its currency so no caller can
 * mistake it for local money. Before this route is used, price it in AUD.
 */
const BASE_CURRENCY = 'INR';

const formatBasePrice = (amount: number) =>
  new Intl.NumberFormat(region.htmlLang, {
    style: 'currency',
    currency: BASE_CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);

const pricingSchema = z.object({
  academicLevel: z.enum(['high_school', 'bachelor', 'master', 'phd']),
  deadline: z.string(), // Date string or days
  pages: z.number().int().min(1),
});

// POST /api/pricing/calculate - Calculate price
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if deadline is a date string or number of days
    let days: number;
    
    if (typeof body.deadline === 'string' && body.deadline.includes('-')) {
      // It's a date string
      const deadlineDate = new Date(body.deadline);
      const now = new Date();
      days = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      days = parseInt(body.deadline);
    }
    
    if (days < 0) {
      return apiError('Deadline cannot be in the past', 400);
    }
    
    const data = {
      academicLevel: body.academicLevel,
      deadline: days,
      pages: body.pages,
    };
    
    const result = pricingSchema.safeParse(data);
    
    if (!result.success) {
      return apiError(result.error.issues[0]?.message ?? 'Invalid request', 400);
    }
    
    const pricing = calculatePrice(result.data);
    
    return apiResponse({
      pricing: {
        ...pricing,
        daysUntilDeadline: days,
        formattedPrice: formatBasePrice(pricing.totalPrice),
      },
    });
  } catch (error) {
    console.error('Pricing calculation error:', error);
    return apiError('Internal server error', 500);
  }
}

// GET /api/pricing/calculate - Get pricing tiers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const academicLevel = searchParams.get('academicLevel') as 'high_school' | 'bachelor' | 'master' | 'phd' || 'high_school';
    const pages = parseInt(searchParams.get('pages') || '1');
    
    // Calculate prices for different deadline tiers
    const tiers = [
      { days: 14, label: '14+ days', multiplier: 1.0 },
      { days: 7, label: '7-13 days', multiplier: 1.3 },
      { days: 3, label: '3-6 days', multiplier: 1.6 },
      { days: 2, label: '24-48 hours', multiplier: 2.2 },
      { days: 1, label: 'Under 24 hours', multiplier: 3.0 },
    ];
    
    const pricePerPage = {
      high_school: 250,
      bachelor: 350,
      master: 450,
      phd: 750,
    }[academicLevel] || 250;
    
    const pricing = tiers.map(tier => ({
      ...tier,
      pricePerPage,
      totalPrice: Math.round(pricePerPage * tier.multiplier * pages),
      formattedPrice: formatBasePrice(Math.round(pricePerPage * tier.multiplier * pages)),
    }));
    
    return apiResponse({
      academicLevel,
      pages,
      basePricePerPage: pricePerPage,
      currency: BASE_CURRENCY,
      pricing,
    });
  } catch (error) {
    console.error('Get pricing error:', error);
    return apiError('Internal server error', 500);
  }
}
