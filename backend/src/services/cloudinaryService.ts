import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (
  filePath: string,
  type: 'images' | 'videos' = 'images'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const resourceType: 'image' | 'video' = type === 'videos' ? 'video' : 'image';

    const options = {
      resource_type: resourceType,
      folder: `aisiplan/${type}`,
    };

    cloudinary.uploader.upload(filePath, options, (error, result) => {
      console.log("🌩️ Resultado de Cloudinary:", result);

      fs.unlink(filePath, (err) => {
        if (err) console.warn('⚠️ No se pudo eliminar el archivo local:', err.message);
      });

      if (error) return reject(error);
      if (result?.secure_url) return resolve(result.secure_url);

      return reject(new Error('❌ No se obtuvo secure_url de Cloudinary'));
    });
  });
};
