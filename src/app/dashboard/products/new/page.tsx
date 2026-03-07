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
      // Fix: Use instanceof Error to safely access .message without 'any'
      const message = error instanceof Error ? error.message : 'An error occurred';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <ProductForm onSubmit={handleCreate} isLoading={loading} />
      </div>
    </div>
  );
}