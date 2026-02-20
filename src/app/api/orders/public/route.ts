import { NextRequest, NextResponse } from 'next/server';

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SA-${timestamp}-${random}`;
}

// POST /api/orders/public - Create order (guest or logged-in user)
export async function POST(request: NextRequest) {
  console.log('=== ORDER API START ===');
  
  try {
    const { db } = await import('@/lib/db');
    
    const body = await request.json();
    console.log('Order data received:', {
      email: body.email,
      subject: body.subject,
      pages: body.pages,
      attachmentsCount: body.attachments?.length || 0
    });
    
    const { 
      email, 
      phone, 
      subject, 
      description, 
      deadline, 
      deadlineTime, 
      pages, 
      service, 
      coupon, 
      attachments 
    } = body;

    // Validate
    if (!email || !phone || !subject || !description || !deadline || !pages) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    const deadlineDate = new Date(`${deadline}T${deadlineTime || '12:00'}:00`);

    // Find or create user
    let user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      try {
        user = await db.user.create({
          data: {
            email: email,
            phone: phone,
            name: email.split('@')[0] || 'Customer',
            role: 'customer',
            password: '',
          },
        });
        console.log('Created user:', user.id);
      } catch {
        user = await db.user.findUnique({
          where: { email: email },
        });
        if (!user) {
          return NextResponse.json(
            { error: 'Failed to create user account' },
            { status: 500 }
          );
        }
      }
    } else {
      if (phone && user.phone !== phone) {
        await db.user.update({
          where: { id: user.id },
          data: { phone: phone },
        }).catch(() => {});
      }
    }

    // Create order
    const order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: user.id,
        title: `${subject} - ${pages} pages`,
        description: description,
        subject: subject,
        academicLevel: 'bachelor',
        paperType: 'essay',
        pages: parseInt(String(pages)),
        words: parseInt(String(pages)) * 250,
        pricePerPage: 0,
        urgencyMultiplier: 1,
        totalPrice: 0,
        deadline: deadlineDate,
        requirements: JSON.stringify({
          service: service || 'writing',
          coupon: coupon || null,
        }),
        status: 'pending',
        paymentStatus: 'pending_quote',
        // Store attachments as JSON with URLs
        attachments: attachments && attachments.length > 0 
          ? JSON.stringify(attachments) 
          : null,
      },
    });

    console.log('Order created:', order.orderNumber, 'with', attachments?.length || 0, 'attachments');

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully. We will send you a quote soon.',
      order: {
        orderNumber: order.orderNumber,
        title: order.title,
        totalPrice: order.totalPrice,
        deadline: order.deadline,
        status: order.status,
        attachmentsCount: attachments?.length || 0,
      },
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('=== ORDER ERROR ===');
    console.error(error);
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit order' },
      { status: 500 }
    );
  }
}
