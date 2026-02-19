import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Available currencies with conversion rates (base: INR)
const AVAILABLE_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0095 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.018 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.016 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 0.044 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.016 },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 0.020 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 0.22 },
];

// GET - Fetch public settings (currency)
export async function GET() {
  try {
    const setting = await db.setting.findUnique({
      where: { key: 'defaultCurrency' },
    });
    
    // Default to USD
    const defaultCurrency = 'USD';
    const defaultCurrencyInfo = AVAILABLE_CURRENCIES[0];

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
        code: 'USD',
        symbol: '$',
        rate: 0.012,
        name: 'US Dollar',
      }
    });
  }
}
