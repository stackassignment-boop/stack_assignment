import { NextRequest, NextResponse } from 'next/server';

// Configure route for larger payloads and longer execution time
export const runtime = 'nodejs';
export const maxDuration = 60;

// Import db with proper database URL
async function getDb() {
  const { db } = await import('@/lib/db');
  return db;
}

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SA-${timestamp}-${random}`;
}

// Convert file to base64
async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

// POST /api/orders/public - Create order (guest or logged-in user)
export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    
    // Check content type to determine how to parse the request
    const contentType = request.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    let email: string, phone: string, subject: string, description: string;
    let deadline: string, deadlineTime: string, pages: number;
    let service: string = 'writing';
    let coupon: string | null = null;
    let attachments: Array<{ name: string; type: string; size: number; data: string }> = [];
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData upload (better for files)
      console.log('Processing multipart/form-data request');
      const formData = await request.formData();
      
      email = formData.get('email') as string;
      phone = formData.get('phone') as string;
      subject = formData.get('subject') as string;
      description = formData.get('description') as string;
      deadline = formData.get('deadline') as string;
      deadlineTime = (formData.get('deadlineTime') as string) || '12:00';
      pages = parseInt(formData.get('pages') as string) || 1;
      service = (formData.get('service') as string) || 'writing';
      coupon = formData.get('coupon') as string | null;
      
      // Handle multiple files
      const files = formData.getAll('files') as File[];
      console.log('Files received:', files.length);
      
      for (const file of files) {
        if (file && file.size > 0) {
          // Check file size (10MB limit per file for FormData)
          if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
              { error: `File "${file.name}" exceeds 10MB limit. Please choose a smaller file.` },
              { status: 400 }
            );
          }
          
          try {
            const base64 = await fileToBase64(file);
            attachments.push({
              name: file.name,
              type: file.type || 'application/octet-stream',
              size: file.size,
              data: base64
            });
            console.log(`Processed file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
          } catch (fileErr) {
            console.error('Error processing file:', file.name, fileErr);
            return NextResponse.json(
              { error: `Failed to process file "${file.name}". Please try again.` },
              { status: 400 }
            );
          }
        }
      }
    } else {
      // Handle JSON request (backwards compatibility)
      console.log('Processing JSON request');
      const body = await request.json();
      
      email = body.email;
      phone = body.phone;
      subject = body.subject;
      description = body.description;
      deadline = body.deadline;
      deadlineTime = body.deadlineTime || '12:00';
      pages = body.pages;
      service = body.service || 'writing';
      coupon = body.coupon || null;
      attachments = body.attachments || [];
      
      console.log('Order data received:', { 
        email, 
        phone, 
        subject, 
        deadline, 
        pages,
        hasAttachments: !!attachments,
        attachmentsCount: attachments?.length || 0
      });
    }

    // Validate required fields
    if (!email || !phone || !subject || !description || !deadline || !pages) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    // Parse deadline
    const deadlineDate = new Date(`${deadline}T${deadlineTime}:00`);
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

    // Create order with attachments as JSON string
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

    console.log('Order created successfully:', order.orderNumber, 'with', attachments.length, 'attachments');

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully. We will send you a quote soon.',
      order: {
        orderNumber: order.orderNumber,
        title: order.title,
        totalPrice: order.totalPrice,
        deadline: order.deadline,
        status: order.status,
        attachmentsCount: attachments.length,
      },
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Create public order error:', error);
    
    let errorMessage = 'Failed to submit order. Please try again.';
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      
      // Handle specific error types
      if (error.message.includes('body') && error.message.includes('limit')) {
        errorMessage = 'Files are too large. Please reduce file sizes or use fewer files.';
      } else if (error.message.includes('JSON')) {
        errorMessage = 'Invalid request format. Please try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
