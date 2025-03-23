import { Request, Response } from "express";
import { Inscripcion } from "../../entities/Inscripcion";
import dataSource from "../../config/database";

export const createInscripcion = async (req: Request, res: Response): Promise<void> => {
    const { usuario_id, actividad_id } = req.body;
  
    try {
      const inscripcion = dataSource.getRepository(Inscripcion).create({
        usuario: { id_usuario: usuario_id }, // Relación con Usuario
        actividad: { id_actividad: actividad_id }, // Relación con Actividad
      });
      await dataSource.getRepository(Inscripcion).save(inscripcion);
      res.status(201).json({ message: "Inscripción creada exitosamente", inscripcion });
    } catch (error) {
      console.error("Error al crear inscripción:", error);
      res.status(500).json({ message: "Error al crear inscripción", error });
    }
  };