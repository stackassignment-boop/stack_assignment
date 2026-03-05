import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Available currencies with conversion rates (base: INR)
export const AVAILABLE_CURRENCIES = [
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

// GET - Fetch all settings
export async function GET() {
  try {
    const settings = await db.setting.findMany();
    
    // Default settings if none exist
    const defaultSettings = {
      defaultCurrency: 'USD',
      currencySymbol: '$',
      currencyRate: 0.012,
    };

    if (!settings || settings.length === 0) {
      return NextResponse.json({ settings: defaultSettings });
    }

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    // Get currency details
    const currencyCode = settingsMap.defaultCurrency || 'USD';
    const currencyInfo = AVAILABLE_CURRENCIES.find(c => c.code === currencyCode) || AVAILABLE_CURRENCIES[0];

    return NextResponse.json({
      settings: {
        defaultCurrency: currencyCode,
        currencySymbol: currencyInfo.symbol,
        currencyRate: currencyInfo.rate,
      },
      allSettings: settingsMap,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ settings: { defaultCurrency: 'USD', currencySymbol: '$', currencyRate: 0.012 } });
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

    // Get currency info if updating currency
    let currencySymbol = '$';
    let currencyRate = 0.012;
    
    if (key === 'defaultCurrency') {
      const currencyInfo = AVAILABLE_CURRENCIES.find(c => c.code === value);
      if (currencyInfo) {
        currencySymbol = currencyInfo.symbol;
        currencyRate = currencyInfo.rate;
      }
    }

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
      } 
    });
  } catch (error) {
    console.error('Error updating setting:', error);
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
  }
}
