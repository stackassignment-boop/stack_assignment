import { NextRequest, NextResponse } from 'next/server';

// GET /api/samples/[slug]/download - Download disabled for non-admin users
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Downloads are disabled - users need to contact admin for full access
  return NextResponse.json({ 
    error: 'Download is not available. Please contact admin via WhatsApp to get full access to samples.',
    contact: 'https://wa.me/919907300710'
  }, { status: 403 });
}
