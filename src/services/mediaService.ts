import cloudinary from '@/lib/media/cloudinary';

export const mediaService = {
  async deleteImage(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Cloudinary Delete Error:', error);
      return false;
    }
  }
};