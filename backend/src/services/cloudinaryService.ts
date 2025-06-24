import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Sube una imagen a Cloudinary y elimina el archivo local.
 * @param filePath Ruta local absoluta
 */
export const uploadToCloudinary = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { resource_type: 'image' }, (error, result) => {
      // Borrar archivo local después de subir
      fs.unlink(filePath, (err) => {
        if (err) console.warn('No se pudo eliminar el archivo local:', err.message);
      });

      if (error) return reject(error);
      if (result?.secure_url) return resolve(result.secure_url);
      return reject(new Error('No se obtuvo URL de Cloudinary'));
    });
  });
};
