import { Request, Response } from 'express';
import { Activity } from '../../entities/Activity';
import dataSource from '../../config/database';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';

// Lee ruta base desde .env o usa './public' por defecto
const uploadBasePath = process.env.UPLOAD_RESOURCES_PATH || './public/';

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const activity = await dataSource.getRepository(Activity).findOneBy({ activity_id: parseInt(id) });

    if (!activity) {
      res.status(404).json({ message: 'Actividad no encontrada' });
      return;
    }

    // Borrar imágenes asociadas
    if (activity.activity_images && activity.activity_images.length > 0) {
      for (const img of activity.activity_images) {
        if (typeof img !== 'string') continue; // por si acaso

        if (img.startsWith('https://res.cloudinary.com/')) {
          // Extraer public_id de la URL Cloudinary
          // Ejemplo URL: https://res.cloudinary.com/<cloud_name>/image/upload/v1234567/folder/filename.jpg
          const parts = img.split('/');
          // El public_id está después de 'upload/' y antes de la extensión
          const uploadIndex = parts.findIndex(p => p === 'upload');
          if (uploadIndex !== -1 && parts.length > uploadIndex + 1) {
            let publicIdWithExt = parts.slice(uploadIndex + 1).join('/');
            // Quitar la extensión
            const lastDot = publicIdWithExt.lastIndexOf('.');
            const publicId = publicIdWithExt.substring(0, lastDot);
            // Borrar en Cloudinary
            try {
              await cloudinary.uploader.destroy(publicId);
              // console.log(`Imagen Cloudinary eliminada: ${publicId}`);
            } catch (err) {
              console.warn(`Error eliminando imagen Cloudinary ${publicId}:`, err);
            }
          }
        } else {
          // Suponemos que es ruta local (solo nombre o path relativo)
          const imagePath = path.resolve(process.cwd(), uploadBasePath, 'uploads', 'images', img);
          if (fs.existsSync(imagePath)) {
            try {
              fs.unlinkSync(imagePath);
              console.log('Imagen local eliminada:', imagePath);
            } catch (err) {
              console.warn('Error eliminando imagen local:', imagePath, err);
            }
          } else {
            console.log('Imagen local no encontrada:', imagePath);
          }
        }
      }
    }

    // Finalmente eliminar la actividad de la DB
    await dataSource.getRepository(Activity).remove(activity);

    res.status(200).json({ message: 'Actividad eliminada exitosamente' });

  } catch (error) {
    console.error('Error al eliminar actividad:', error);
    res.status(500).json({ message: 'Error al eliminar actividad', error });
  }
};