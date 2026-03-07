import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { generateSignature } from '@/lib/media/cloudinary';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Products will be stored in a dedicated folder in Cloudinary
    const { timestamp, signature } = generateSignature('supplybridge/products');
    
    return NextResponse.json({
      timestamp,
      signature,
      folder: 'supplybridge/products',
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error('Signature Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}