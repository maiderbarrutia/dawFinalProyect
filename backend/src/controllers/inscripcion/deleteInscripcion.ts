import { Request, Response } from "express";
import { Inscripcion } from "../../entities/Inscripcion";
import dataSource from "../../config/database";

export const deleteInscripcion = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const inscripcion = await dataSource.getRepository(Inscripcion).findOneBy({ id_inscripcion: parseInt(id) });
      if (!inscripcion) {
        res.status(404).json({ message: "Inscripción no encontrada" });
        return;
      }
  
      await dataSource.getRepository(Inscripcion).remove(inscripcion);
      res.status(200).json({ message: "Inscripción eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar inscripción:", error);
      res.status(500).json({ message: "Error al eliminar inscripción", error });
    }
  };