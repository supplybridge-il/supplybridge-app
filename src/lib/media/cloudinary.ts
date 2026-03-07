import { v2 as cloudinary } from 'cloudinary';

// Configuration as per PRD requirements
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const generateSignature = (folder: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // Signature includes the timestamp and the target folder
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  );

  return { timestamp, signature };
};

export default cloudinary;