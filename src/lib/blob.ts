/**
 * Vercel Blob upload helper.
 *
 * The same PUT-to-blob.vercel-storage.com block was previously copy-pasted into
 * /api/upload and /api/admin/requirements. New routes use this helper instead of
 * adding a third copy.
 */

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10MB

/** Document types accepted for similarity checking. */
export const DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

export const DOCUMENT_TYPES_LABEL = 'PDF, DOC, DOCX or TXT';

export type BlobUploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string; status: number };

/**
 * Validate a user-supplied file against the document allow-list and size cap.
 * Returns null when the file is acceptable, or an error to hand straight back.
 */
export function validateDocument(
  file: File | null,
  fieldLabel = 'file'
): { error: string; status: number } | null {
  if (!file || typeof file === 'string' || file.size === 0) {
    return { error: `No ${fieldLabel} provided`, status: 400 };
  }

  if (!DOCUMENT_MIME_TYPES.includes(file.type)) {
    return {
      error: `Invalid file type. Only ${DOCUMENT_TYPES_LABEL} files are accepted.`,
      status: 400,
    };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: 'File size exceeds the 10MB limit', status: 400 };
  }

  return null;
}

/**
 * Upload a file to Vercel Blob under the given folder prefix.
 * Never throws — failures come back as { ok: false }.
 */
export async function uploadToBlob(file: File, folder: string): Promise<BlobUploadResult> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (!blobToken) {
    console.error('BLOB_READ_WRITE_TOKEN not configured');
    return { ok: false, error: 'File upload is not configured. Please contact support.', status: 500 };
  }

  // Strip anything that could alter the blob path, then namespace by timestamp
  // so two students uploading "assignment.docx" do not collide.
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(-120);
  const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  try {
    const arrayBuffer = await file.arrayBuffer();

    const uploadResponse = await fetch(`https://blob.vercel-storage.com/${key}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${blobToken}`,
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: Buffer.from(arrayBuffer),
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Blob upload failed:', uploadResponse.status, errorText);
      return { ok: false, error: 'Upload failed. Please try again.', status: 502 };
    }

    const blobData = (await uploadResponse.json()) as { url?: string };

    if (!blobData.url) {
      console.error('Blob upload returned no URL');
      return { ok: false, error: 'Upload failed. Please try again.', status: 502 };
    }

    return { ok: true, url: blobData.url };
  } catch (error) {
    console.error('Blob upload error:', error);
    return { ok: false, error: 'Upload failed. Please try again.', status: 502 };
  }
}
