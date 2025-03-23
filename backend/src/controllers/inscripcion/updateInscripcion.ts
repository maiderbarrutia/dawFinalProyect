import { Request, Response } from "express";
import { Inscripcion } from "../../entities/Inscripcion";
import dataSource from "../../config/database";

export const updateInscripcion = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { usuario_id, actividad_id } = req.body;
  
    try {
      const inscripcion = await dataSource.getRepository(Inscripcion).findOneBy({ id_inscripcion: parseInt(id) });
      if (!inscripcion) {
        res.status(404).json({ message: "Inscripción no encontrada" });
        return;
      }
  
      const updatedInscripcion = dataSource.getRepository(Inscripcion).merge(inscripcion, {
        usuario: usuario_id ? { id_usuario: usuario_id } : undefined, // Actualiza si se proporciona un usuario_id
        actividad: actividad_id ? { id_actividad: actividad_id } : undefined, // Actualiza si se proporciona un actividad_id
      });
      await dataSource.getRepository(Inscripcion).save(updatedInscripcion);
      res.status(200).json({ message: "Inscripción actualizada exitosamente", updatedInscripcion });
    } catch (error) {
      console.error("Error al actualizar inscripción:", error);
      res.status(500).json({ message: "Error al actualizar inscripción", error });
    }
  };