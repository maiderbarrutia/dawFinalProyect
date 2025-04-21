import { Request, Response } from "express";
import { Activity } from "../../entities/Activity";
import dataSource from "../../config/database";


export const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const actividades = await dataSource.getRepository(Activity).find({
      relations: ["company", "category"],
    });
    res.status(200).json(actividades);
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    res.status(500).json({ message: "Error al obtener actividades", error });
  }
};