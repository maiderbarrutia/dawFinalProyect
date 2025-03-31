import { Request, Response } from "express";
import { Activity } from "../../entities/Activity";
import dataSource from "../../config/database";

export const getActivityById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const activity = await dataSource.getRepository(Activity).findOne({
        where: { activity_id: parseInt(id) },
        relations: ["company", "category"],
      });
      if (!activity) {
        res.status(404).json({ message: "Actividad no encontrada" });
        return;
      }
      res.status(200).json(activity);
    } catch (error) {
      console.error("Error al obtener actividad:", error);
      res.status(500).json({ message: "Error al obtener actividad", error });
    }
  };