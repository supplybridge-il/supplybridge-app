import Image from 'next/image';
import { IProduct } from '@/types/product.types';

// Define a type for products with populated supplier details
interface MarketplaceProduct extends Omit<IProduct, 'supplierId'> {
  supplierId: {
    _id: string;
    companyName?: string;
  };
}

export function ProductCard({ product }: { product: MarketplaceProduct }) {
  // Available quantity: baseQuantity - reservedQuantity
  const available = (product.baseQuantity || 0) - (product.reservedQuantity || 0);
  const supplierName = product.supplierId?.companyName || 'Verified Supplier';

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-slate-100">
        {product.images?.[0] ? (
          <Image 
            src={product.images[0].url} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform" 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-xs">No Image</div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <span className="text-[10px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full truncate">
            {product.category}
          </span>
          <span className="text-[10px] text-slate-500 truncate">{supplierName}</span>
        </div>
        <h3 className="font-bold text-slate-900 line-clamp-1 text-sm">{product.name}</h3>
        <div className="flex items-baseline gap-1 text-blue-700">
          <span className="text-base font-bold">₪{product.priceRange.min}</span>
          <span className="text-[10px] text-slate-400">- ₪{product.priceRange.max}</span>
        </div>
        <div className="grid grid-cols-2 text-[10px] text-slate-500 pt-2 border-t border-slate-50">
          <span>MOQ: {product.minOrderQty} {product.unit}</span>
          <span className="text-right">Stock: {available > 0 ? available : 'Out'}</span>
        </div>
      </div>
    </div>
  );
}