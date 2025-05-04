import { Request, Response } from 'express';
import { Activity } from '../../entities/Activity';
import { Company } from '../../entities/Company';
import { Category } from '../../entities/Category';
import dataSource from '../../config/database';

export const createActivity = async (req: Request, res: Response): Promise<void> => {
  const { company_id, category_id, ...activityData } = req.body;
  
  // Recibe las imágenes subidas por multer
  const activityImages = req.files as Express.Multer.File[];

  try {
    // Verificar la empresa existe
    const company = await dataSource.getRepository(Company).findOne({ where: { company_id } });
    if (!company) {
      res.status(404).json({ message: 'Empresa no encontrada.' });  // Aquí enviamos un JSON
      return;
    }

    // Verificar si la categoría existe
    const category = await dataSource.getRepository(Category).findOne({ where: { category_id } });
    if (!category) {
      res.status(404).json({ message: 'Categoría no encontrada.' });  // Aquí enviamos un JSON
      return;
    }

    // Crear la actividad
    const activity = dataSource.getRepository(Activity).create({
      ...activityData,
      company,
      category,
      activity_images: activityImages.map((file) => `${file.filename}`),
    });

    // Guardar la actividad en la base de datos
    await dataSource.getRepository(Activity).save(activity);

    // Devolver la actividad creada
    res.status(201).json({ message: "Actividad creada exitosamente", activity });

  } catch (error) {
    // Asegurándonos de que siempre respondemos con un JSON
    if (error instanceof Error) {
      console.error("Error al crear actividad:", error.message);
      res.status(500).json({ message: "Error al crear actividad.", error: error.message });  // JSON de error
    } else {
      console.error("Error desconocido al crear actividad", error);
      res.status(500).json({ message: "Error desconocido al crear actividad" });  // JSON de error
    }
  }
};
