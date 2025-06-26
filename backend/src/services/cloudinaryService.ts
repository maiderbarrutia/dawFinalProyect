import dotenv from 'dotenv';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

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
      // Eliminar archivo local
      fs.unlink(filePath, (err) => {
        if (err) console.warn('⚠️ No se pudo eliminar el archivo local:', err.message);
      });

      if (error) {
        return reject(error);
      }

      if (result?.secure_url) {
        return resolve(result.secure_url);
      }

      return reject(new Error('❌ No se obtuvo URL válida de Cloudinary'));
    });
  });
};

export const deleteFromCloudinary = async (url: string): Promise<void> => {
  try {
    const publicId = extractPublicIdFromUrl(url);
    if (!publicId) throw new Error('No se pudo extraer public_id de la URL.');

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error eliminando recurso en Cloudinary:', error);
    throw error;
  }
};

const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    const fullPath = parts[1];
    const lastDotIndex = fullPath.lastIndexOf('.');
    if (lastDotIndex === -1) return fullPath;

    return fullPath.substring(0, lastDotIndex);
  } catch {
    return null;
  }
};

