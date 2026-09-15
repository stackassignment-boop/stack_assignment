import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { region } from '@/lib/seo-config';

// Available currencies, with conversion rates expressed against a base of INR.
//
// ⚠ These rates are hardcoded and will drift — see the note in
// src/app/api/admin/settings/route.ts. AUD is listed first so that any `[0]`
// fallback resolves to the primary market rather than to the US dollar.
const AVAILABLE_CURRENCIES = [
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

// GET - Fetch public settings (currency)
export async function GET() {
  try {
    const setting = await db.setting.findUnique({
      where: { key: 'defaultCurrency' },
    });
    
    // Default to AUD: Australia is the primary market, so an AU visitor
    // should see Australian dollars without having to switch currency.
    // Looked up by code rather than by array index — the previous
    // `AVAILABLE_CURRENCIES[0]` only happened to be USD, so reordering the
    // list would have silently paired the wrong symbol with the code.
    const defaultCurrency = region.currency;
    const defaultCurrencyInfo =
      AVAILABLE_CURRENCIES.find((c) => c.code === defaultCurrency) ?? AVAILABLE_CURRENCIES[0];

    if (!setting) {
      return NextResponse.json({ 
        currency: {
          code: defaultCurrency,
          symbol: defaultCurrencyInfo.symbol,
          rate: defaultCurrencyInfo.rate,
          name: defaultCurrencyInfo.name,
        }
      });
    }

    const currencyCode = setting.value || defaultCurrency;
    const currencyInfo = AVAILABLE_CURRENCIES.find(c => c.code === currencyCode) || defaultCurrencyInfo;

    return NextResponse.json({ 
      currency: {
        code: currencyCode,
        symbol: currencyInfo.symbol,
        rate: currencyInfo.rate,
        name: currencyInfo.name,
      }
    });
  } catch (error) {
    console.error('Error fetching public settings:', error);
    return NextResponse.json({ 
      currency: {
        code: 'AUD',
        symbol: 'A$',
        rate: 0.018,
        name: 'Australian Dollar',
      }
    });
  }
}
