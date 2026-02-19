import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Simple session storage reference (shared with auth)
const sessions = new Map<string, { userId: string; email: string; name: string }>();

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('student_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ orders: [] });
    }

    // For now, return empty orders since we need to link orders to students
    // In a real app, you would fetch orders associated with the logged-in student
    
    // Get user from session
    // const session = sessions.get(sessionToken);
    
    // For demo purposes, return sample orders structure
    return NextResponse.json({ 
      orders: [],
      message: 'Orders will appear here once you place them'
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ orders: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('student_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Please login to place an order' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      subject,
      academicLevel,
      paperType,
      pages,
      deadline,
      requirements,
    } = body;

    // Calculate price (basic calculation)
    const pricePerPage = 150; // Base price per page in INR
    const totalPrice = pages * pricePerPage;

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

    // For now, we'll create a placeholder response
    // In production, you would save this to the database linked to the student

    return NextResponse.json({
      message: 'Order placed successfully',
      order: {
        orderNumber,
        title,
        totalPrice,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to place order' },
      { status: 500 }
    );
  }
}
