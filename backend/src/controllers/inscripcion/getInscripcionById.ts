import { Request, Response } from "express";
import { Inscripcion } from "../../entities/Inscripcion";
import dataSource from "../../config/database";

export const getInscripcionById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const inscripcion = await dataSource.getRepository(Inscripcion).findOne({
        where: { id_inscripcion: parseInt(id) },
        relations: ["usuario", "actividad"], // Incluye las relaciones con Usuario y Actividad
      });
      if (!inscripcion) {
        res.status(404).json({ message: "Inscripción no encontrada" });
        return;
      }
      res.status(200).json(inscripcion);
    } catch (error) {
      console.error("Error al obtener inscripción:", error);
      res.status(500).json({ message: "Error al obtener inscripción", error });
    }
  };