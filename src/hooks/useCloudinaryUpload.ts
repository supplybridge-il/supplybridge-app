import { useState } from 'react';

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      // Step 1: Get signature from our API
      const signRes = await fetch('/api/upload/sign');
      const { signature, timestamp, apiKey, cloudName, folder } = await signRes.json();

      // Step 2: Upload directly to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('folder', folder);

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const uploadRes = await fetch(url, { method: 'POST', body: formData });
      const data = await uploadRes.json();

      return {
        publicId: data.public_id,
        url: data.secure_url,
        width: data.width,
        height: data.height
      };
    } catch (error) {
      console.error('Upload failed:', error);
      throw new Error('Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
}