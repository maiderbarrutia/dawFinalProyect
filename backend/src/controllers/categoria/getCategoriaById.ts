import { Request, Response } from "express";
import { Categoria } from "../../entities/Categoria";
import dataSource from "../../config/database";

export const getCategoriaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const categoria = await dataSource.getRepository(Categoria).findOneBy({ id_categoria: parseInt(id) });
      if (!categoria) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }
      res.status(200).json(categoria);
    } catch (error) {
      console.error("Error al obtener categoría:", error);
      res.status(500).json({ message: "Error al obtener categoría", error });
    }
  };