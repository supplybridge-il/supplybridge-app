'use client';

import NextImage from 'next/image';
import { useWatch, Control } from 'react-hook-form';
import { ImageUpload } from '../ui/ImageUpload'; 
import { ProductInput } from '@/utils/validators';
import { Trash2, Image as ImageIcon } from 'lucide-react';

interface Props {
  control: Control<ProductInput>;
  onUpload: (image: { url: string; publicId: string }) => void;
  onRemove: () => void;
  error?: string;
}

export function ProductImageSection({ control, onUpload, onRemove, error }: Props) {
  const images = useWatch({ control, name: 'images' }) || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
        <ImageIcon className="w-4 h-4" />
        <label>Product Image</label>
      </div>

      {images.length > 0 ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-white group shadow-sm">
          <NextImage src={images[0].url} alt="Preview" fill className="object-contain p-4" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          <button 
            type="button" 
            onClick={onRemove} 
            className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-lg hover:bg-red-50 shadow-md border border-slate-100 transition-all active:scale-95 z-10"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <ImageUpload onUpload={onUpload} />
      )}
      {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}
    </div>
  );
}