'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductInput } from '@/utils/validators';
import { FormItem } from '../ui/FormItem';
import { Coins } from 'lucide-react';

export function PriceSection({ register, errors }: { register: UseFormRegister<ProductInput>, errors: FieldErrors<ProductInput> }) {
  return (
    <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-4">
      <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
        <Coins className="w-4 h-4" /> <span>Pricing (ILS)</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormItem id="price-min" label="Min Price" error={errors.priceRange?.min?.message}>
          <input type="number" {...register('priceRange.min', { valueAsNumber: true })} 
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
        </FormItem>
        <FormItem id="price-max" label="Max Price" error={errors.priceRange?.max?.message}>
          <input type="number" {...register('priceRange.max', { valueAsNumber: true })} 
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none" />
        </FormItem>
      </div>
    </div>
  );
}