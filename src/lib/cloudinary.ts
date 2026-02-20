// Cloudinary configuration for file uploads
// This allows direct client-side uploads to Cloudinary, bypassing Vercel's body size limits

export const CLOUDINARY_CONFIG = {
  // These can be set as environment variables
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
  apiKey: process.env.CLOUDINARY_API_KEY || '',
  apiSecret: process.env.CLOUDINARY_API_SECRET || '',
};

// Check if Cloudinary is configured
export function isCloudinaryConfigured(): boolean {
  return !!(CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.uploadPreset);
}

// Upload file to Cloudinary directly from client
export async function uploadToCloudinary(file: File): Promise<{ url: string; publicId: string; name: string; size: number; type: string } | null> {
  if (!isCloudinaryConfigured()) {
    console.warn('Cloudinary not configured. File uploads will not work.');
    return null;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('resource_type', 'auto'); // Auto-detect file type
  formData.append('folder', 'stack-assignment/orders');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Cloudinary upload error:', error);
      return null;
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
}

// Delete file from Cloudinary (server-side only)
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!CLOUDINARY_CONFIG.apiKey || !CLOUDINARY_CONFIG.apiSecret) {
    console.warn('Cloudinary API credentials not configured.');
    return false;
  }

  try {
    const response = await fetch('/api/upload/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Delete failed:', error);
    return false;
  }
}
