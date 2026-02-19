import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Create a fresh Prisma client for this request
const getPrismaClient = () => {
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

// POST /api/orders/public - Create order (guest or logged-in user)
export async function POST(request: NextRequest) {
  const prisma = getPrismaClient();
  
  try {
    const body = await request.json();
    console.log('Received order request:', { ...body, description: body.description?.substring(0, 50) + '...' });

    // Validate required fields
    const { email, phone, subject, description, deadline, deadlineTime, pages, service, coupon, attachments } = body;

    console.log('Order data received:', { 
      email, 
      phone, 
      subject, 
      deadline, 
      pages,
      hasAttachments: !!attachments,
      attachmentsCount: attachments?.length || 0,
      attachments: attachments
    });

    if (!email || !phone || !subject || !description || !deadline || !pages) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    // Parse deadline
    const deadlineDate = new Date(`${deadline}T${deadlineTime || '12:00'}:00`);
    console.log('Parsed deadline:', deadlineDate.toISOString());

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

    // Create order WITHOUT price - admin will set it later
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: user.id,
        title: `${subject} - ${pages} pages`,
        description: description,
        subject: subject,
        academicLevel: body.academicLevel || 'bachelor',
        paperType: body.paperType || 'essay',
        pages: parseInt(String(pages)),
        words: parseInt(String(pages)) * 250,
        pricePerPage: 0, // Will be set by admin
        urgencyMultiplier: 1, // Will be set by admin
        totalPrice: 0, // Will be set by admin - 0 means pending quote
        deadline: deadlineDate,
        requirements: JSON.stringify({
          service: service || 'writing',
          coupon: coupon || null,
        }),
        attachments: attachments && attachments.length > 0 ? JSON.stringify(attachments) : null,
        status: 'pending',
        paymentStatus: 'pending_quote', // Special status - waiting for admin to set price
      },
    });

    console.log('Order created successfully:', order.orderNumber);
    console.log('Order attachments saved:', order.attachments);

    // Disconnect prisma
    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully. We will send you a quote soon.',
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
