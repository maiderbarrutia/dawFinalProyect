import { Request, Response } from "express";
import { Actividad } from "../../entities/Actividad";
import dataSource from "../../config/database";

export const getActividadById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const actividad = await dataSource.getRepository(Actividad).findOne({
        where: { id_actividad: parseInt(id) },
        relations: ["empresa", "categoria"],
      });
      if (!actividad) {
        res.status(404).json({ message: "Actividad no encontrada" });
        return;
      }
      res.status(200).json(actividad);
    } catch (error) {
      console.error("Error al obtener actividad:", error);
      res.status(500).json({ message: "Error al obtener actividad", error });
    }
  };