import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { region } from '@/lib/seo-config';

/**
 * Available currencies, with conversion rates expressed against a base of INR.
 *
 * ⚠ THESE RATES ARE HARDCODED AND WILL DRIFT. They are point-in-time figures
 * committed to source, not live FX. Every non-INR price shown anywhere on the
 * site is derived from them, so as they age the displayed prices quietly stop
 * matching what is actually charged — which for an Australian audience is a
 * pricing representation under the Australian Consumer Law, not just a rounding
 * annoyance. Either refresh them on a schedule from an FX source, or store real
 * AUD prices and stop converting at display time. Given Australia is now the
 * primary market, storing AUD directly is the better fix.
 *
 * AUD is listed first so it is what any `[0]` fallback resolves to.
 */
export const AVAILABLE_CURRENCIES = [
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.018 },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 0.020 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0095 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.016 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 0.044 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.016 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 0.22 },
];

/**
 * Resolve a currency code to its symbol and rate, defaulting to the primary
 * market's currency.
 *
 * This exists because the defaults were previously written out by hand in four
 * places, and they had drifted: `defaultCurrency` said 'AUD' while the symbol
 * beside it said '$' and the rate beside it was 0.012 — the US dollar rate. Any
 * request that hit a fallback path therefore rendered Australian prices about a
 * third lower than intended, under a US dollar sign. Deriving all three from one
 * lookup makes that class of mismatch impossible.
 */
function currencyFor(code?: string | null) {
  const fallback =
    AVAILABLE_CURRENCIES.find((c) => c.code === region.currency) ?? AVAILABLE_CURRENCIES[0];
  const info = code ? AVAILABLE_CURRENCIES.find((c) => c.code === code) ?? fallback : fallback;
  return {
    defaultCurrency: info.code,
    currencySymbol: info.symbol,
    currencyRate: info.rate,
  };
}

// GET - Fetch all settings
export async function GET() {
  try {
    const settings = await db.setting.findMany();

    if (!settings || settings.length === 0) {
      return NextResponse.json({ settings: currencyFor() });
    }

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({
      settings: currencyFor(settingsMap.defaultCurrency),
      allSettings: settingsMap,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ settings: currencyFor() });
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    // When the currency itself is being changed, echo back the symbol and rate
    // for the new code; otherwise echo back the primary market's.
    const { currencySymbol, currencyRate } =
      key === 'defaultCurrency' ? currencyFor(value) : currencyFor();

    // Upsert the setting
    await db.setting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });

    return NextResponse.json({
      success: true,
      setting: {
        key,
        value,
        currencySymbol,
        currencyRate,
      },
    });
  } catch (error) {
    console.error('Error updating setting:', error);
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
  }
}
