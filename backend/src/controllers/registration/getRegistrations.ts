import { Request, Response } from "express";
import { Registration } from "../../entities/Registration";
import dataSource from "../../config/database";

export const getRegistrations = async (req: Request, res: Response): Promise<void> => {
    try {
      const registrations = await dataSource.getRepository(Registration).find({
        relations: ["userData", "activity"], // Incluye las relaciones con Usuario y Actividad
      });
      res.status(200).json(registrations);
    } catch (error) {
      console.error("Error al obtener inscripciones:", error);
      res.status(500).json({ message: "Error al obtener inscripciones", error });
    }
  };