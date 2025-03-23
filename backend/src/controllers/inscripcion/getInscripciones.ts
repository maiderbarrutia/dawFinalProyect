import { Request, Response } from "express";
import { Inscripcion } from "../../entities/Inscripcion";
import dataSource from "../../config/database";

export const getInscripciones = async (req: Request, res: Response): Promise<void> => {
    try {
      const inscripciones = await dataSource.getRepository(Inscripcion).find({
        relations: ["usuario", "actividad"], // Incluye las relaciones con Usuario y Actividad
      });
      res.status(200).json(inscripciones);
    } catch (error) {
      console.error("Error al obtener inscripciones:", error);
      res.status(500).json({ message: "Error al obtener inscripciones", error });
    }
  };