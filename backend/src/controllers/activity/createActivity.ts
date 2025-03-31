import { Request, Response } from "express";
import { Activity } from "../../entities/Activity";
import dataSource from "../../config/database";

export const createActivity = async (req: Request, res: Response): Promise<void> => {
  const { company_id, category_id, ...activityData } = req.body;
  
    try {
      const activity = dataSource.getRepository(Activity).create({
        ...activityData,
        company: { id_company: company_id },
        category: { id_category: category_id }
      });
      await dataSource.getRepository(Activity).save(activity);
      res.status(201).json({ message: "Actividad creada exitosamente", activity });
    } catch (error) {
      console.error("Error al crear actividad:", error);
      res.status(500).json({ message: "Error al crear actividad", error });
    }
  };