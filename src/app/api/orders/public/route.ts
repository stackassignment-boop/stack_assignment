import { NextRequest, NextResponse } from 'next/server';

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SA-${timestamp}-${random}`;
}

// POST /api/orders/public - Create order (guest or logged-in user)
export async function POST(request: NextRequest) {
  console.log('=== ORDER API CALLED ===');
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  
  try {
    const { db } = await import('@/lib/db');
    
    // Check content type
    const contentType = request.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    let email: string, phone: string, subject: string, description: string;
    let deadline: string, deadlineTime: string, pages: number;
    let service: string = 'writing';
    let coupon: string | null = null;
    let files: File[] = [];
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData upload
      console.log('Processing multipart/form-data request');
      
      try {
        const formData = await request.formData();
        console.log('FormData received, entries:');
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
          } else {
            console.log(`  ${key}: ${value}`);
          }
        }
        
        email = formData.get('email') as string;
        phone = formData.get('phone') as string;
        subject = formData.get('subject') as string;
        description = formData.get('description') as string;
        deadline = formData.get('deadline') as string;
        deadlineTime = (formData.get('deadlineTime') as string) || '12:00';
        pages = parseInt(formData.get('pages') as string) || 1;
        service = (formData.get('service') as string) || 'writing';
        coupon = formData.get('coupon') as string | null;
        
        // Get all files
        const filesEntries = formData.getAll('files');
        console.log('Files entries count:', filesEntries.length);
        
        files = filesEntries.filter(f => {
          const isFile = f instanceof File;
          console.log('Entry:', f, 'isFile:', isFile);
          return isFile;
        }) as File[];
        
        console.log('Files filtered count:', files.length);
        
        // Log each file
        for (const file of files) {
          console.log(`File: ${file.name}, size: ${file.size}, type: ${file.type}`);
        }
        
        // Validate file sizes (10MB limit)
        for (const file of files) {
          if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
              { error: `File "${file.name}" exceeds 10MB limit.` },
              { status: 400 }
            );
          }
        }
      } catch (formError) {
        console.error('FormData parsing error:', formError);
        return NextResponse.json(
          { error: 'Failed to parse form data. Please try again with smaller files.' },
          { status: 400 }
        );
      }
    } else {
      // Handle JSON request (backward compatibility)
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
    }

    // Validate required fields
    if (!email || !phone || !subject || !description || !deadline || !pages) {
      console.log('Validation failed. Missing fields:', { email: !!email, phone: !!phone, subject: !!subject, description: !!description, deadline: !!deadline, pages: !!pages });
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
      },
    });

    console.log('Order created:', order.orderNumber);

    // Store files in OrderAttachment table
    if (files.length > 0) {
      console.log('Processing', files.length, 'files for storage...');
      
      for (const file of files) {
        try {
          // Read file as buffer
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          console.log(`Creating OrderAttachment for ${file.name}, buffer size: ${buffer.length}`);
          
          await db.orderAttachment.create({
            data: {
              orderId: order.id,
              fileName: file.name,
              fileType: file.type || 'application/octet-stream',
              fileSize: file.size,
              fileData: buffer,
            },
          });
          
          console.log('Stored file:', file.name);
        } catch (fileError) {
          console.error('Error storing file:', file.name, fileError);
          // Continue with other files even if one fails
        }
      }
      
      // Update order attachments field with file info
      const attachmentsInfo = files.map(f => ({
        name: f.name,
        type: f.type,
        size: f.size,
      }));
      
      await db.order.update({
        where: { id: order.id },
        data: { attachments: JSON.stringify(attachmentsInfo) },
      });
    }

    console.log('Order created successfully:', order.orderNumber, 'with', files.length, 'attachments');

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully. We will send you a quote soon.',
      order: {
        orderNumber: order.orderNumber,
        title: order.title,
        totalPrice: order.totalPrice,
        deadline: order.deadline,
        status: order.status,
        attachmentsCount: files.length,
      },
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('=== CREATE PUBLIC ORDER ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Full error:', error);
    
    let errorMessage = 'Failed to submit order. Please try again.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
