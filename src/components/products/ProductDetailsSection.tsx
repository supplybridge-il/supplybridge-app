'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductInput } from '@/utils/validators';
import { FormItem } from '../ui/FormItem';
import { AlignLeft, Package, ShoppingBag } from 'lucide-react';

interface Props {
  register: UseFormRegister<ProductInput>;
  errors: FieldErrors<ProductInput>;
}

export function ProductDetailsSection({ register, errors }: Props) {
  return (
    <div className="space-y-4">
      <FormItem id="product-desc" label="Description" error={errors.description?.message}>
        <div className="relative">
          <AlignLeft className="absolute top-3.5 left-3 w-4 h-4 text-slate-400" />
          <textarea {...register('description')} rows={3} placeholder="Describe your product..." 
            className="w-full pl-10 p-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all" />
        </div>
      </FormItem>

      <div className="grid grid-cols-2 gap-4">
        <FormItem id="product-unit" label="Unit (kg, m, pcs)" error={errors.unit?.message}>
          <div className="relative">
            <Package className="absolute top-3 left-3 w-4 h-4 text-slate-400" />
            <input {...register('unit')} placeholder="pcs"
              className="w-full pl-10 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white" />
          </div>
        </FormItem>

        <FormItem id="product-moq" label="Min Order (MOQ)" error={errors.minOrderQty?.message}>
          <div className="relative">
            <ShoppingBag className="absolute top-3 left-3 w-4 h-4 text-slate-400" />
            <input type="number" {...register('minOrderQty', { valueAsNumber: true })} 
              className="w-full pl-10 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
          </div>
        </FormItem>
      </div>
    </div>
  );
}