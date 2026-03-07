'use client';

import { useRef } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { Button } from './Button';
import { UploadCloud, ImagePlus } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (image: { publicId: string; url: string }) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useCloudinaryUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadImage(file);
      onUpload(result); 
    } catch {
      alert('Upload failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
      <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
        <UploadCloud className="w-8 h-8 text-blue-600" aria-hidden="true" />
      </div>
      
      <div className="text-center space-y-1">
        <p className="text-sm font-black text-slate-900">Upload Product Media</p>
        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">PNG, JPG • Max 5MB</p>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      
      <Button 
        type="button" 
        // Fixed: Added bg-slate-900 and text-white for maximum contrast
        className="mt-2 flex gap-2 items-center bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95"
        isLoading={isUploading} 
        onClick={() => fileInputRef.current?.click()}
      >
        {!isUploading && <ImagePlus className="w-4 h-4" />}
        <span className="font-bold">{isUploading ? 'Uploading...' : 'Select Media'}</span>
      </Button>
    </div>
  );
}