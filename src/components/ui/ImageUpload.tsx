'use client';

import { useRef } from 'react';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { Button } from './Button';

interface ImageUploadProps {
  onUploadComplete: (image: { publicId: string; url: string }) => void;
}

export function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useCloudinaryUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadImage(file);
      onUploadComplete(result);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 border-2 border-dashed border-slate-300 rounded-lg text-center">
      <p className="text-sm text-slate-600">Upload Product Image (Max 5MB)</p>
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />
      <Button 
        type="button" 
        isLoading={isUploading} 
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? 'Uploading...' : 'Select Image'}
      </Button>
    </div>
  );
}