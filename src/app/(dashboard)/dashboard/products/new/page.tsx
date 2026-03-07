'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/products/ProductForm';
import { ProductInput } from '@/utils/validators';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (data: ProductInput) => {
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create product');
      }

      router.push('/dashboard/products');
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Removed max-w-2xl and internal white box to allow the form to fill the screen */
    <main className="min-h-screen bg-slate-50/50 w-full pt-8 pb-20 lg:pb-8">
      <header className="px-8 mb-4 flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          List New Product
        </h1>
        <p className="text-slate-500 font-medium">
          Expand your marketplace presence with high-quality inventory listings.
        </p>
      </header>

      {/* The ProductForm now handles its own internal grid and card spacing */}
      <ProductForm onSubmit={handleCreate} isLoading={loading} />
    </main>
  );
}