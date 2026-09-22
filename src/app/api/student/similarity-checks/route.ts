import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { db } from '@/lib/db';
import { uploadToBlob, validateDocument } from '@/lib/blob';
import { generateSimilarityRef } from '@/lib/similarity';

/**
 * Fields a student is allowed to see about their own submission.
 * adminNotes is included deliberately (it is written *to* the student);
 * nothing else internal is exposed.
 */
const studentSelect = {
  id: true,
  referenceNumber: true,
  title: true,
  subject: true,
  wordCount: true,
  notes: true,
  fileName: true,
  fileSize: true,
  status: true,
  reportFileName: true,
  reportFilePath: true,
  similarityScore: true,
  adminNotes: true,
  reviewedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

/** Resolve the signed-in student. Returns null when there is no valid session. */
async function getStudent(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token?.email) {
    return null;
  }

  return db.user.findUnique({
    where: { email: token.email },
    select: { id: true, isActive: true },
  });
}

// GET /api/student/similarity-checks - the signed-in student's own submissions
export async function GET(request: NextRequest) {
  try {
    const student = await getStudent(request);

    if (!student) {
      return NextResponse.json({ checks: [] });
    }

    const checks = await db.similarityCheck.findMany({
      where: { customerId: student.id },
      orderBy: { createdAt: 'desc' },
      select: studentSelect,
    });

    return NextResponse.json({ checks });
  } catch (error) {
    console.error('Error fetching similarity checks:', error);
    return NextResponse.json({ checks: [] });
  }
}

// POST /api/student/similarity-checks - submit a document for checking
export async function POST(request: NextRequest) {
  try {
    const student = await getStudent(request);

    if (!student) {
      return NextResponse.json(
        { error: 'Please sign in to submit a document for checking.' },
        { status: 401 }
      );
    }

    if (!student.isActive) {
      return NextResponse.json(
        { error: 'This account is not active. Please contact support.' },
        { status: 403 }
      );
    }

    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = ((formData.get('title') as string) || '').trim();
    const subject = ((formData.get('subject') as string) || '').trim();
    const notes = ((formData.get('notes') as string) || '').trim();
    const wordCountRaw = ((formData.get('wordCount') as string) || '').trim();

    if (title.length < 3) {
      return NextResponse.json(
        { error: 'Please give your document a title of at least 3 characters.' },
        { status: 400 }
      );
    }

    const fileError = validateDocument(file, 'document');
    if (fileError) {
      return NextResponse.json({ error: fileError.error }, { status: fileError.status });
    }

    const parsedWordCount = Number.parseInt(wordCountRaw, 10);
    const wordCount =
      Number.isFinite(parsedWordCount) && parsedWordCount > 0 ? parsedWordCount : null;

    // Don't let one student queue an unbounded number of unreviewed documents.
    const openSubmissions = await db.similarityCheck.count({
      where: { customerId: student.id, status: { in: ['pending', 'in_review'] } },
    });

    if (openSubmissions >= 5) {
      return NextResponse.json(
        {
          error:
            'You already have 5 documents awaiting review. Please wait for those to come back before submitting another.',
        },
        { status: 429 }
      );
    }

    const upload = await uploadToBlob(file as File, 'similarity-checks');

    if (!upload.ok) {
      return NextResponse.json({ error: upload.error }, { status: upload.status });
    }

    const check = await db.similarityCheck.create({
      data: {
        referenceNumber: generateSimilarityRef(),
        customerId: student.id,
        title,
        subject: subject || null,
        wordCount,
        notes: notes || null,
        fileName: (file as File).name,
        fileSize: (file as File).size,
        fileType: (file as File).type,
        filePath: upload.url,
        status: 'pending',
      },
      select: studentSelect,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your document has been submitted. We will email you when the report is ready.',
        check,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create similarity check error:', error);
    return NextResponse.json(
      { error: 'Something went wrong submitting your document. Please try again.' },
      { status: 500 }
    );
  }
}
