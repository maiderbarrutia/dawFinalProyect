import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Sube un archivo a Cloudinary en la carpeta aisiplan/images o aisiplan/videos según el tipo,
 * luego elimina el archivo local.
 * 
 * @param filePath Ruta local absoluta del archivo
 * @param type 'images' | 'videos' — define la carpeta donde se guardará el archivo
 * @returns URL segura del archivo subido en Cloudinary
 */
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

      // Borrar archivo local después de subir
      fs.unlink(filePath, (err) => {
        if (err) console.warn('⚠️ No se pudo eliminar el archivo local:', err.message);
      });

      if (error) return reject(error);

      if (result?.public_id && result?.format) {
        // Construimos la URL manualmente para asegurarnos de que incluya la carpeta y el nombre
        const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${result.public_id}.${result.format}`;
        return resolve(url);
      }

      return reject(new Error('❌ No se obtuvo URL válida de Cloudinary'));
    });
  });
};
