'use client';

import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import NextImage from 'next/image';
import { productSchema, ProductInput } from '@/utils/validators';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { ProductCategory, CloudinaryImage } from '@/types/product.types';

export function ProductForm({ onSubmit, isLoading }: { 
  onSubmit: (data: ProductInput) => void, isLoading: boolean 
}) {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '', sku: '', description: '', unit: '', baseQuantity: 0, 
      minOrderQty: 1, tags: [], images: [], isActive: true,
      category: ProductCategory.OTHER, priceRange: { min: 0, max: 0, currency: 'ILS' }
    }
  });

  const images = useWatch({ control, name: 'images' }) || [];
  const onValid: SubmitHandler<ProductInput> = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Input label="SKU" {...register('sku')} error={errors.sku?.message} />
      </div>
      <textarea {...register('description')} placeholder="Description" className="w-full border p-2 rounded" />
      <div className="grid grid-cols-3 gap-4">
        <select {...register('category')} className="border rounded p-2">
          {Object.values(ProductCategory).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <Input label="Unit" {...register('unit')} error={errors.unit?.message} />
        <Input label="Min Order" type="number" {...register('minOrderQty', { valueAsNumber: true })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Min Price" type="number" {...register('priceRange.min', { valueAsNumber: true })} />
        <Input label="Max Price" type="number" {...register('priceRange.max', { valueAsNumber: true })} />
      </div>
      <ImageUpload onUploadComplete={(img) => setValue('images', [...images, img])} />
      <div className="flex gap-2 flex-wrap">
        {images.map((img: CloudinaryImage) => (
          <NextImage key={img.publicId} src={img.url} alt="Product" width={80} height={80} className="rounded border" />
        ))}
      </div>
      <Button type="submit" isLoading={isLoading} className="w-full">Create Product</Button>
    </form>
  );
}