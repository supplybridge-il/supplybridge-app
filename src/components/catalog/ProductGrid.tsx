'use client';

import { IProduct } from '@/types/product.types';
import { ProductCard } from './ProductCard';

// Define the type for products with populated supplier info
interface MarketplaceProduct extends Omit<IProduct, 'supplierId'> {
  supplierId: {
    _id: string;
    companyName?: string;
  };
}

export function ProductGrid({ 
  products, 
  isLoading 
}: { 
  products: MarketplaceProduct[]; 
  isLoading?: boolean 
}) {
  if (isLoading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-80 w-full bg-slate-100 animate-pulse rounded-xl" />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        // Fix: Removed 'as any' to satisfy strict TypeScript and ESLint rules
        <ProductCard key={p._id?.toString()} product={p} />
      ))}
    </div>
  );
}