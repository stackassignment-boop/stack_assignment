import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/orders/[id] - Get order details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    const { id } = await params;
    
    const order = await db.order.findUnique({
      where: { id },
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
    
    if (!order) {
      return apiError('Order not found', 404);
    }
    
    // Check access - admin or order owner
    if (user.role !== 'admin' && order.customerId !== user.id) {
      return apiError('Access denied', 403);
    }
    
    return apiResponse({ order });
  } catch (error) {
    console.error('Get order error:', error);
    return apiError('Internal server error', 500);
  }
}

// PUT /api/orders/[id] - Update order
const updateOrderSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(20).optional(),
  subject: z.string().min(2).optional(),
  pages: z.number().int().min(1).optional(),
  words: z.number().int().optional(),
  deadline: z.string().transform(val => new Date(val)).optional(),
  requirements: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  notes: z.string().optional(),
  // Admin only fields
  status: z.enum(['pending', 'confirmed', 'in_progress', 'review', 'completed', 'cancelled', 'refunded']).optional(),
  paymentStatus: z.enum(['pending', 'pending_quote', 'pending_payment', 'paid', 'refunded']).optional(),
  // `assignedWriter` used to be accepted here. There is no such column on
  // Order and no screen that sends it, so it only ever served to make the
  // update below fail. Left out so the field is stripped rather than written.
  totalPrice: z.number().positive().optional(),
});

// PATCH /api/orders/[id] - Partial update order
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    const { id } = await params;
    
    const order = await db.order.findUnique({
      where: { id },
    });
    
    if (!order) {
      return apiError('Order not found', 404);
    }
    
    // Only admin can use PATCH
    if (user.role !== 'admin') {
      return apiError('Access denied', 403);
    }
    
    const body = await request.json();
    
    const updateData: Record<string, unknown> = {};
    
    if (body.status) {
      updateData.status = body.status;
      // No `completedAt` write here. Order has no such column, and because
      // `updateData` is a Record<string, unknown> the compiler could not see
      // that: Prisma rejected the whole update at runtime with "Unknown
      // argument `completedAt`", so an admin marking an order completed got a
      // 500 and the status change was never saved. Dropping the write is what
      // restores the feature. `updatedAt` already records when a status last
      // changed; a real completion timestamp needs a schema column first.
    }
    if (body.paymentStatus) {
      updateData.paymentStatus = body.paymentStatus;
    }
    if (body.totalPrice !== undefined && body.totalPrice > 0) {
      updateData.totalPrice = body.totalPrice;
      // Also update payment status when price is set
      if (order.paymentStatus === 'pending_quote' || order.totalPrice === 0) {
        updateData.paymentStatus = 'pending_payment';
      }
    }
    // An `assignedWriter` write lived here too, with the same problem and no
    // column to land in. Nothing in the app ever sent the field, so removing
    // it loses no functionality — writer assignment was never implemented.

    const updatedOrder = await db.order.update({
      where: { id },
      data: updateData,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Order updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Update order error:', error);
    return apiError('Internal server error', 500);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    const { id } = await params;
    
    const order = await db.order.findUnique({
      where: { id },
    });
    
    if (!order) {
      return apiError('Order not found', 404);
    }
    
    // Check access
    if (user.role !== 'admin' && order.customerId !== user.id) {
      return apiError('Access denied', 403);
    }
    
    const body = await request.json();
    const result = updateOrderSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.issues[0]?.message ?? 'Invalid request', 400);
    }
    
    const data = result.data;
    
    // Separate admin-only fields
    const adminFields = ['status', 'paymentStatus'];
    const hasAdminFields = adminFields.some(field => field in data);
    
    if (hasAdminFields && user.role !== 'admin') {
      return apiError('Only admins can update order status', 403);
    }
    
    // Customer can only update pending orders
    if (user.role !== 'admin' && order.status !== 'pending') {
      return apiError('Can only update pending orders', 400);
    }
    
    // Build update data
    const updateData: Record<string, unknown> = {};
    
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.subject) updateData.subject = data.subject;
    if (data.pages) updateData.pages = data.pages;
    if (data.words) updateData.words = data.words;
    if (data.deadline) updateData.deadline = data.deadline;
    if (data.requirements !== undefined) updateData.requirements = data.requirements;
    if (data.attachments) updateData.attachments = JSON.stringify(data.attachments);
    if (data.notes !== undefined) updateData.notes = data.notes;
    
    // Admin fields
    if (user.role === 'admin') {
      if (data.status) {
        updateData.status = data.status;
        // Two writes were removed from this block, both naming columns that do
        // not exist on Order:
        //
        //   completedAt  when status === 'completed'  — reachable, and it made
        //                Prisma throw "Unknown argument", so the update failed
        //                entirely and the status was never saved.
        //   deliveredAt  when status === 'delivered'  — doubly dead: the schema
        //                above never accepts 'delivered', so the branch was
        //                rejected with a 400 long before this line.
        //
        // `updateData` is a Record<string, unknown>, which is why the compiler
        // stayed quiet about both. Adding real completion/delivery timestamps
        // is a schema change, not a one-line edit, so the writes are gone
        // rather than wired up; `updatedAt` still records the last change.
      }
      if (data.paymentStatus) updateData.paymentStatus = data.paymentStatus;
    }
    
    // Recalculate price if pages changed
    if (data.pages && data.pages !== order.pages) {
      const now = new Date();
      const deadline = new Date(order.deadline);
      const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      const { calculatePrice } = await import('@/lib/auth');
      const pricing = calculatePrice({
        academicLevel: order.academicLevel as 'high_school' | 'bachelor' | 'master' | 'phd',
        deadline: daysUntilDeadline,
        pages: data.pages,
      });
      
      updateData.totalPrice = pricing.totalPrice;
    }
    
    const updatedOrder = await db.order.update({
      where: { id },
      data: updateData,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return apiResponse({
      success: true,
      message: 'Order updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Update order error:', error);
    return apiError('Internal server error', 500);
  }
}

// DELETE /api/orders/[id] - Cancel/Delete order
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return apiError('Not authenticated', 401);
    }
    
    const { id } = await params;
    
    const order = await db.order.findUnique({
      where: { id },
    });
    
    if (!order) {
      return apiError('Order not found', 404);
    }
    
    // Check access
    if (user.role !== 'admin' && order.customerId !== user.id) {
      return apiError('Access denied', 403);
    }
    
    // Only allow cancellation of pending orders
    if (user.role !== 'admin' && !['pending', 'confirmed'].includes(order.status)) {
      return apiError('Cannot cancel this order', 400);
    }
    
    // Admin can delete, customer can only cancel
    if (user.role === 'admin') {
      await db.order.delete({
        where: { id },
      });
    } else {
      await db.order.update({
        where: { id },
        data: { status: 'cancelled' },
      });
    }
    
    return apiResponse({
      success: true,
      message: user.role === 'admin' ? 'Order deleted' : 'Order cancelled',
    });
  } catch (error) {
    console.error('Delete order error:', error);
    return apiError('Internal server error', 500);
  }
}
