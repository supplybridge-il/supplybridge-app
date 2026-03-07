'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (query) params.set('q', query); else params.delete('q');
      
      startTransition(() => {
        router.push(`/marketplace?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search products by name, tag, or material (Hebrew/English)..."
        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isPending && <div className="absolute right-4 top-4 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
      <span className="absolute left-4 top-4 text-slate-400">🔍</span>
    </div>
  );
}