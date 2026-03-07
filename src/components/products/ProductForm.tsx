'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductInput } from '@/utils/validators';
import { ProductCategory } from '@/types/product.types';
import { ProductImageSection } from './ProductImageSection';
import { ProductDetailsSection } from './ProductDetailsSection';
import { PriceSection } from './PriceSection';
import { LogisticsHeader } from './LogisticsHeader';
import { FormItem } from '../ui/FormItem';
import { FormSubmitBar } from './FormSubmitBar';

export function ProductForm({ onSubmit, isLoading }: { onSubmit: (data: ProductInput) => void, isLoading: boolean }) {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '', category: ProductCategory.CONSTRUCTION, baseQuantity: 0, images: [],
      sku: '', description: '', minOrderQty: 1, unit: 'units', 
      priceRange: { min: 0, max: 0, currency: 'ILS' }, isActive: true, tags: []
    }
  });

  useEffect(() => { setValue('sku', `SB-${Date.now()}`); }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto pb-24 lg:pb-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <section className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
            <ProductImageSection control={control} error={errors.images?.message as string}
              onUpload={(img) => setValue('images', [img], { shouldValidate: true })} 
              onRemove={() => setValue('images', [], { shouldValidate: true })} />
          </section>
          <PriceSection register={register} errors={errors} />
        </div>

        <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
          <section className="bg-white p-8 lg:p-10 rounded-4xl border border-slate-100 shadow-sm space-y-8">
            <LogisticsHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormItem id="p-name" label="Product Name" error={errors.name?.message}><input {...register('name')} placeholder="e.g. Portland Cement" className="form-input-pro" /></FormItem>
              <FormItem id="p-cat" label="Category"><select {...register('category')} className="form-input-pro bg-white">{Object.values(ProductCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></FormItem>
            </div>
            <ProductDetailsSection register={register} errors={errors} />
            <div className="pt-4 border-t border-slate-50">
              <FormItem id="s-count" label="Stock Level" error={errors.baseQuantity?.message}><input type="number" {...register('baseQuantity', { valueAsNumber: true })} className="form-input-pro max-w-xs" /></FormItem>
            </div>
          </section>
        </div>
      </div>
      <FormSubmitBar isLoading={isLoading} label="Publish to Marketplace" />
    </form>
  );
}