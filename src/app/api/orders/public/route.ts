import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SA-${timestamp}-${random}`;
}

// POST /api/orders/public - Create order (guest or logged-in user)
export async function POST(request: NextRequest) {
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
      attachmentsCount: attachments?.length || 0
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
    let user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      // Create a new customer account
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
        console.log('Created new user:', user.id);
      } catch (createError: unknown) {
        console.error('Error creating user:', createError);
        // User might have been created by another request, try to find again
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
      // Update phone if provided and different
      if (phone && user.phone !== phone) {
        try {
          await db.user.update({
            where: { id: user.id },
            data: { phone: phone },
          });
        } catch (e) {
          console.error('Error updating user phone:', e);
        }
      }
      console.log('Found existing user:', user.id);
    }

    // Create order with attachments stored in separate table
    const order = await db.order.create({
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
        status: 'pending',
        paymentStatus: 'pending_quote', // Special status - waiting for admin to set price
      },
    });

    // Store attachments in separate table
    if (attachments && attachments.length > 0) {
      console.log('Saving attachments to database...');
      
      for (const file of attachments) {
        try {
          // Convert base64 to buffer
          const base64Data = file.data.split(',')[1]; // Remove data:mime;base64, prefix
          const buffer = Buffer.from(base64Data, 'base64');
          
          await db.orderAttachment.create({
            data: {
              orderId: order.id,
              fileName: file.name,
              fileType: file.type,
              fileSize: file.size,
              fileData: buffer,
            },
          });
          
          console.log('Saved attachment:', file.name, file.size, 'bytes');
        } catch (attachError) {
          console.error('Error saving attachment:', file.name, attachError);
        }
      }
    }

    console.log('Order created successfully:', order.orderNumber);

    // Fetch order with attachments for response
    const orderWithAttachments = await db.order.findUnique({
      where: { id: order.id },
      include: {
        attachments: {
          select: {
            id: true,
            fileName: true,
            fileType: true,
            fileSize: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully. We will send you a quote soon.',
      order: {
        orderNumber: order.orderNumber,
        title: order.title,
        totalPrice: order.totalPrice,
        deadline: order.deadline,
        status: order.status,
        attachments: orderWithAttachments?.attachments?.map(a => ({
          id: a.id,
          name: a.fileName,
          type: a.fileType,
          size: a.fileSize,
        })),
      },
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Create public order error:', error);
    
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
