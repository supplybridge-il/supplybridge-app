'use client';

import { Package } from 'lucide-react';

export function LogisticsHeader() {
  return (
    <div className="flex items-center gap-4 pb-6 border-b border-slate-50">
      <div className="p-3 bg-blue-50 rounded-2xl">
        <Package className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Product Details</h2>
        <p className="text-sm text-slate-500 font-medium">Define industrial specs and inventory.</p>
      </div>
    </div>
  );
}