'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useEffect, useState, useRef } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();
  const initialRender = useRef(true);

  useEffect(() => {
    // Skip the very first render to prevent loop on mount
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const currentQ = searchParams.get('q') || '';
      // ONLY push if the query is actually different from the URL
      if (query === currentQ) return;

      const params = new URLSearchParams(searchParams);
      if (query) params.set('q', query); else params.delete('q');
      
      startTransition(() => {
        router.push(`/marketplace?${params.toString()}`, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isPending && <div className="absolute right-4 top-4 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
    </div>
  );
}