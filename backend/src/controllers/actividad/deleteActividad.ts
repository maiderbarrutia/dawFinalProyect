import { Request, Response } from "express";
import { Actividad } from "../../entities/Actividad";
import dataSource from "../../config/database";

export const deleteActividad = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const actividad = await dataSource.getRepository(Actividad).findOneBy({ id_actividad: parseInt(id) });
      if (!actividad) {
        res.status(404).json({ message: "Actividad no encontrada" });
        return;
      }
  
      await dataSource.getRepository(Actividad).remove(actividad);
      res.status(200).json({ message: "Actividad eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar actividad:", error);
      res.status(500).json({ message: "Error al eliminar actividad", error });
    }
  };