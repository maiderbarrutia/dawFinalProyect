import { Request, Response } from "express";
import { Registration } from "../../entities/Registration";
import dataSource from "../../config/database";

export const getRegistrationById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const registration = await dataSource.getRepository(Registration).findOne({
        where: { registration_id: parseInt(id) },
        relations: ["userData", "activity"], // Incluye las relaciones con Usuario y Actividad
      });
      if (!registration) {
        res.status(404).json({ message: "Inscripción no encontrada" });
        return;
      }
      res.status(200).json(registration);
    } catch (error) {
      console.error("Error al obtener inscripción:", error);
      res.status(500).json({ message: "Error al obtener inscripción", error });
    }
  };