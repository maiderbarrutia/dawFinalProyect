import { Request, Response } from "express";
import { Actividad } from "../../entities/Actividad";
import dataSource from "../../config/database";

export const updateActividad = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const actividad = await dataSource.getRepository(Actividad).findOneBy({ id_actividad: parseInt(id) });
      if (!actividad) {
        res.status(404).json({ message: "Actividad no encontrada" });
        return;
      }
  
      const updatedActividad = dataSource.getRepository(Actividad).merge(actividad, {
        ...updatedData,
        empresa: updatedData.empresa_id ? { id_empresa: updatedData.empresa_id } : undefined,
        categoria: updatedData.categoria_id ? { id_categoria: updatedData.categoria_id } : undefined,
      });
      await dataSource.getRepository(Actividad).save(updatedActividad);
      res.status(200).json({ message: "Actividad actualizada exitosamente", updatedActividad });
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
      res.status(500).json({ message: "Error al actualizar actividad", error });
    }
  };