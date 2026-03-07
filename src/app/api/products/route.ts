import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { productService } from '@/services/productService';
import { productRepository } from '@/repositories/productRepository';
import { UserRole, UserSession } from '@/types/user.types';
import { productSchema } from '@/utils/validators';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const products = await productRepository.findMarketplace({ 
    category: searchParams.get('category'), 
    query: searchParams.get('q') 
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession | undefined;

  if (!user || user.role === UserRole.ADMIN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const product = await productService.createProduct(user.id, user.tier, parsed.data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'LIMIT_EXCEEDED') {
      return NextResponse.json({ error: 'Upgrade for >25 SKUs' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}