import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { generateOrderNumber, calculatePrice, apiResponse, apiError } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

// Schema for public order creation (guest orders)
const publicOrderSchema = z.object({
  email: z.string().email('Valid email is required'),
  phone: z.string().min(5, 'Phone number is required'),
  subject: z.string().min(2, 'Subject is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  deadline: z.string().min(1, 'Deadline is required'),
  deadlineTime: z.string().optional(),
  pages: z.number().int().min(1, 'At least 1 page is required'),
  service: z.enum(['writing', 'rewriting', 'editing']).default('writing'),
  coupon: z.string().optional(),
  academicLevel: z.enum(['high_school', 'bachelor', 'master', 'phd']).default('bachelor'),
  paperType: z.string().default('essay'),
});

// POST /api/orders/public - Create order (guest or logged-in user)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = publicOrderSchema.safeParse(body);

    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }

    const data = result.data;

    // Parse deadline
    const deadlineDate = new Date(`${data.deadline}T${data.deadlineTime || '12:00'}`);

    // Calculate days until deadline
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilDeadline < 0) {
      return apiError('Deadline cannot be in the past', 400);
    }

    // Check for existing user or create one
    let user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      // Create a new customer account
      user = await db.user.create({
        data: {
          email: data.email,
          phone: data.phone,
          name: data.email.split('@')[0], // Use email prefix as name
          role: 'customer',
          password: '', // No password for guest orders
        },
      });
    } else {
      // Update phone if provided and different
      if (data.phone && user.phone !== data.phone) {
        await db.user.update({
          where: { id: user.id },
          data: { phone: data.phone },
        });
      }
    }

    // Calculate price
    const pricing = calculatePrice({
      academicLevel: data.academicLevel,
      deadline: daysUntilDeadline,
      pages: data.pages,
    });

    // Apply coupon discount if valid
    let discount = 0;
    if (data.coupon?.toLowerCase() === 'newtostack33') {
      discount = pricing.totalPrice * 0.33;
    }

    const finalPrice = pricing.totalPrice - discount;

    // Create order
    const order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: user.id,
        title: `${data.subject} - ${data.pages} pages`,
        description: data.description,
        subject: data.subject,
        academicLevel: data.academicLevel,
        paperType: data.paperType,
        pages: data.pages,
        words: data.pages * 250,
        pricePerPage: pricing.pricePerPage,
        urgencyMultiplier: pricing.urgencyMultiplier,
        totalPrice: finalPrice,
        deadline: deadlineDate,
        requirements: JSON.stringify({
          service: data.service,
          coupon: data.coupon,
          discount: discount,
          originalPrice: pricing.totalPrice,
        }),
        status: 'pending',
        paymentStatus: 'pending',
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return apiResponse({
      success: true,
      message: 'Order submitted successfully',
      order: {
        orderNumber: order.orderNumber,
        title: order.title,
        totalPrice: order.totalPrice,
        deadline: order.deadline,
        status: order.status,
      },
    }, 201);
  } catch (error) {
    console.error('Create public order error:', error);
    return apiError('Failed to submit order. Please try again.', 500);
  }
}
