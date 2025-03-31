import { Request, Response } from "express";
import { Activity } from "../../entities/Activity";
import dataSource from "../../config/database";

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const activity = await dataSource.getRepository(Activity).findOneBy({ activity_id: parseInt(id) });
      if (!activity) {
        res.status(404).json({ message: "Actividad no encontrada" });
        return;
      }
  
      await dataSource.getRepository(Activity).remove(activity);
      res.status(200).json({ message: "Actividad eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar actividad:", error);
      res.status(500).json({ message: "Error al eliminar actividad", error });
    }
  };