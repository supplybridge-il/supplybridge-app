'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCategory } from '@/types/product.types';

export function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get(key);

    // Prevent redundant navigation if clicking the same filter
    if (current === value && key !== 'inStock') return; 
    
    if (value) params.set(key, value); else params.delete(key);
    
    // Use { scroll: false } to prevent jumping to top on every filter click
    router.push(`/marketplace?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-64 shrink-0 space-y-6 bg-white p-4 rounded-xl border border-slate-100">
      <h4 className="font-bold text-slate-900">Categories</h4>
      <div className="space-y-2">
        {Object.values(ProductCategory).map((cat) => (
          <label key={cat} className="flex items-center gap-3 text-sm cursor-pointer group">
            <input 
              type="radio" 
              className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              checked={searchParams.get('category') === cat}
              onChange={() => updateFilter('category', cat)}
            />
            <span className="group-hover:text-blue-600 transition-colors">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
}