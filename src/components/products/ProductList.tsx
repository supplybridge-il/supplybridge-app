'use client';

import { IProduct } from '@/types/product.types';

export function ProductList({ products }: { products: IProduct[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
          <tr>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">SKU</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Stock (Avail/Base)</th>
            <th className="px-6 py-4 text-right">Price (ILS)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
              <td className="px-6 py-4 text-slate-500 font-mono">{p.sku}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                  {p.category}
                </span>
              </td>
              <td className="px-6 py-4">
                {/* Available quantity logic: baseQuantity - reservedQuantity [cite: 43] */}
                <span className={p.baseQuantity - p.reservedQuantity <= 5 ? 'text-red-600 font-bold' : ''}>
                  {p.baseQuantity - p.reservedQuantity} / {p.baseQuantity} {p.unit}
                </span>
              </td>
              <td className="px-6 py-4 text-right font-semibold">
                ₪{p.priceRange.min} - ₪{p.priceRange.max}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="p-12 text-center text-slate-500">
          No products found. Start by adding your first item.
        </div>
      )}
    </div>
  );
}