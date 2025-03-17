import { Request, Response } from "express";
import { Actividad } from "../entities/Actividad";
import dataSource from "../config/database";

export const getActividad = async (req: Request, res: Response): Promise<Response> => {
  try {
    const actividades = await dataSource
      .getRepository(Actividad)
      .find({ relations: ["empresa", "categoria"] });
    return res.status(200).json(actividades); // Devuelve un objeto Response válido
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    return res.status(500).json({ message: "Error al obtener actividades", error });
  }
};
