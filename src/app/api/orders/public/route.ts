import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Create a fresh Prisma client for this request
const getPrismaClient = () => {
  // Ensure we use the Neon database URL
  const NEON_DATABASE_URL = "postgresql://neondb_owner:npg_A8kgUBsheXJ3@ep-floral-sun-aikg04vz-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  
  return new PrismaClient({
    datasources: {
      db: {
        url: NEON_DATABASE_URL,
      },
    },
  });
};

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SA-${timestamp}-${random}`;
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

// Calculate price
function calculatePrice(academicLevel: string, days: number, pages: number) {
  const pricePerPage = PRICE_PER_PAGE[academicLevel] || 350;
  const urgencyMultiplier = getUrgencyMultiplier(days);
  const totalPrice = Math.round(pricePerPage * urgencyMultiplier * pages);
  
  return {
    pricePerPage,
    urgencyMultiplier,
    totalPrice,
  };
}

// POST /api/orders/public - Create order (guest or logged-in user)
export async function POST(request: NextRequest) {
  const prisma = getPrismaClient();
  
  try {
    const body = await request.json();
    console.log('Received order request:', { ...body, description: body.description?.substring(0, 50) + '...' });

    // Validate required fields
    const { email, phone, subject, description, deadline, deadlineTime, pages, service, coupon } = body;

    if (!email || !phone || !subject || !description || !deadline || !pages) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    // Parse deadline
    const deadlineDate = new Date(`${deadline}T${deadlineTime || '12:00'}:00`);
    console.log('Parsed deadline:', deadlineDate.toISOString());

    // Calculate days until deadline
    const now = new Date();
    const daysUntilDeadline = Math.max(1, Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    // Check for existing user or create one
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: email },
      });
    } catch (e) {
      console.error('Error finding user:', e);
    }

    if (!user) {
      // Create a new customer account
      try {
        user = await prisma.user.create({
          data: {
            email: email,
            phone: phone,
            name: email.split('@')[0] || 'Customer',
            role: 'customer',
            password: '',
          },
        });
        console.log('Created new user:', user.id);
      } catch (createError: unknown) {
        console.error('Error creating user:', createError);
        // User might have been created by another request, try to find again
        user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!user) {
          throw new Error('Failed to create or find user');
        }
      }
    } else {
      // Update phone if provided and different
      if (phone && user.phone !== phone) {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: { phone: phone },
          });
        } catch (e) {
          console.error('Error updating user phone:', e);
        }
      }
      console.log('Found existing user:', user.id);
    }

    // Calculate price
    const academicLevel = body.academicLevel || 'bachelor';
    const pricing = calculatePrice(academicLevel, daysUntilDeadline, parseInt(String(pages)));

    // Apply coupon discount if valid
    let discount = 0;
    if (coupon?.toLowerCase() === 'newtostack33') {
      discount = pricing.totalPrice * 0.33;
    }

    const finalPrice = Math.round(pricing.totalPrice - discount);

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: user.id,
        title: `${subject} - ${pages} pages`,
        description: description,
        subject: subject,
        academicLevel: academicLevel,
        paperType: body.paperType || 'essay',
        pages: parseInt(String(pages)),
        words: parseInt(String(pages)) * 250,
        pricePerPage: pricing.pricePerPage,
        urgencyMultiplier: pricing.urgencyMultiplier,
        totalPrice: finalPrice,
        deadline: deadlineDate,
        requirements: JSON.stringify({
          service: service || 'writing',
          coupon: coupon || null,
          discount: discount,
          originalPrice: pricing.totalPrice,
        }),
        status: 'pending',
        paymentStatus: 'pending',
      },
    });

    console.log('Order created successfully:', order.orderNumber);

    // Disconnect prisma
    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully',
      order: {
        orderNumber: order.orderNumber,
        title: order.title,
        totalPrice: order.totalPrice,
        deadline: order.deadline,
        status: order.status,
      },
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Create public order error:', error);
    await prisma.$disconnect();
    
    // More detailed error message
    let errorMessage = 'Failed to submit order. Please try again.';
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
