'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCategory } from '@/types/product.types';

export function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value); else params.delete(key);
    router.push(`/marketplace?${params.toString()}`);
  };

  return (
    <div className="w-64 shrink-0 space-y-6">
      <div>
        <h4 className="font-bold mb-3 text-slate-900">Categories</h4>
        <div className="space-y-2">
          {Object.values(ProductCategory).slice(0, 8).map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600">
              <input 
                type="radio" 
                name="category"
                checked={searchParams.get('category') === cat}
                onChange={() => updateFilter('category', cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-3 text-slate-900">Availability</h4>
        <label className="flex items-center gap-2 text-sm">
          <input 
            type="checkbox" 
            checked={searchParams.get('inStock') === 'true'}
            onChange={(e) => updateFilter('inStock', e.target.checked ? 'true' : '')}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
}