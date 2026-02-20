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
    
    const contentType = request.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    let email: string, phone: string, subject: string, description: string;
    let deadline: string, deadlineTime: string, pages: number;
    let service: string = 'writing';
    let coupon: string | null = null;
    let files: File[] = [];
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData - same as sample upload
      console.log('Processing multipart/form-data');
      
      const formData = await request.formData();
      
      // Log all entries
      console.log('FormData entries:');
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }
      
      // Get form fields
      email = formData.get('email') as string;
      phone = formData.get('phone') as string;
      subject = formData.get('subject') as string;
      description = formData.get('description') as string;
      deadline = formData.get('deadline') as string;
      deadlineTime = (formData.get('deadlineTime') as string) || '12:00';
      pages = parseInt(formData.get('pages') as string) || 1;
      service = (formData.get('service') as string) || 'writing';
      coupon = formData.get('coupon') as string | null;
      
      // Get all files - using 'file' same as sample upload
      const fileEntries = formData.getAll('file');
      console.log('File entries count:', fileEntries.length);
      
      files = fileEntries.filter(f => f instanceof File) as File[];
      console.log('Files after filter:', files.length);
      
      // Validate file sizes
      for (const file of files) {
        console.log(`File: ${file.name}, size: ${file.size}, type: ${file.type}`);
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File "${file.name}" exceeds 10MB limit.` },
            { status: 400 }
          );
        }
      }
    } else {
      // JSON fallback
      console.log('Processing JSON');
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

    // Validate
    if (!email || !phone || !subject || !description || !deadline || !pages) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    const deadlineDate = new Date(`${deadline}T${deadlineTime}:00`);

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
      },
    });

    console.log('Order created:', order.orderNumber);

    // Store files - same approach as sample upload
    let storedCount = 0;
    for (const file of files) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        await db.orderAttachment.create({
          data: {
            orderId: order.id,
            fileName: file.name,
            fileType: file.type || 'application/octet-stream',
            fileSize: file.size,
            fileData: buffer,
          },
        });
        
        storedCount++;
        console.log('Stored file:', file.name);
      } catch (fileError) {
        console.error('Error storing file:', file.name, fileError);
      }
    }
    
    // Update order with attachment info
    if (files.length > 0) {
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

    console.log(`=== ORDER COMPLETE: ${order.orderNumber}, files stored: ${storedCount} ===`);

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully. We will send you a quote soon.',
      order: {
        orderNumber: order.orderNumber,
        title: order.title,
        totalPrice: order.totalPrice,
        deadline: order.deadline,
        status: order.status,
        attachmentsCount: storedCount,
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
