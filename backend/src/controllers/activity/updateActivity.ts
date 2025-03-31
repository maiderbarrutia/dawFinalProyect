import { Request, Response } from "express";
import { Activity } from "../../entities/Activity";
import dataSource from "../../config/database";

export const updateActivity = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const activity = await dataSource.getRepository(Activity).findOneBy({ activity_id: parseInt(id) });
      if (!activity) {
        res.status(404).json({ message: "Actividad no encontrada" });
        return;
      }
  
      const updatedActivity = dataSource.getRepository(Activity).merge(activity, {
        ...updatedData,
        company: updatedData.company_id ? { id_company: updatedData.company_id } : undefined,
        category: updatedData.category_id ? { id_category: updatedData.category_id } : undefined,
      });
      await dataSource.getRepository(Activity).save(updatedActivity);
      res.status(200).json({ message: "Actividad actualizada exitosamente", updatedActivity });
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
      res.status(500).json({ message: "Error al actualizar actividad", error });
    }
  };