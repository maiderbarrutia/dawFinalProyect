// import { Request, Response } from "express";
// import { Activity } from "../../entities/Activity";
// import dataSource from "../../config/database";

// export const createActivity = async (req: Request, res: Response): Promise<void> => {
//   const { company_id, category_id, ...activityData } = req.body;
  
//     try {
//       const activity = dataSource.getRepository(Activity).create({
//         ...activityData,
//         company: { id_company: company_id },
//         category: { id_category: category_id }
//       });
//       await dataSource.getRepository(Activity).save(activity);
//       res.status(201).json({ message: "Actividad creada exitosamente", activity });
//     } catch (error) {
//       console.error("Error al crear actividad:", error);
//       res.status(500).json({ message: "Error al crear actividad", error });
//     }
//   };

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
    // Buscar la empresa por ID
    const company = await dataSource.getRepository(Company).findOne({ where: { company_id } });
    if (!company) {
      res.status(409).send("Empresa no encontrada.");
      return;
    }

    // Buscar la categoría por ID
    const category = await dataSource.getRepository(Category).findOne({ where: { category_id } });
    if (!category) {
      res.status(409).send("Categoría no encontrada.");
      return;
    }

    // Crear la actividad y asignar la relación
    const activity = dataSource.getRepository(Activity).create({
      ...activityData,
      company,
      category,
      activity_images: activityImages.map((file) => `${file.filename}`),
    });

    // Guardar la actividad en la base de datos
    await dataSource.getRepository(Activity).save(activity);

    // Responder con éxito
    res.status(201).json({ message: "Actividad creada exitosamente", activity });
  } catch (error) {
    console.error("Error al crear actividad:", error);
    res.status(500).json({ message: "Error al crear actividad", error });
  }
};

