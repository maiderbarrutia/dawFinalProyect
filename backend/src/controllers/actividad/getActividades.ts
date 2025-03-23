import { Request, Response } from "express";
import { Actividad } from "../../entities/Actividad";
import dataSource from "../../config/database";

// Obtener todas las actividades
export const getActividades = async (req: Request, res: Response): Promise<void> => {
  try {
    const actividades = await dataSource.getRepository(Actividad).find({
      relations: ["empresa", "categoria"],
    });
    res.status(200).json(actividades);
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    res.status(500).json({ message: "Error al obtener actividades", error });
  }
};